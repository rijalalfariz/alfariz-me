import type { CellUpdate } from '@/hooks/useGoogleSheets';

// ─── Types ──────────────────────────────────────────────────────────────────────
export interface SheetEditInstruction {
  spreadsheetId: string;
  updates: CellUpdate[];
}

export interface ParsedEdits {
  edits: SheetEditInstruction[];
  /** The response text with the JSON block stripped out (clean for display) */
  cleanContent: string;
}

// ─── Parser ─────────────────────────────────────────────────────────────────────
/**
 * Scans the AI's response for a fenced ```sheet_edit ... ``` block,
 * parses the JSON inside it, and returns the edits + a cleaned response string.
 *
 * Expected AI output format:
 *
 * ```sheet_edit
 * {
 *   "edits": [
 *     {
 *       "spreadsheetId": "1BxiMVs0XRA...",
 *       "updates": [
 *         { "range": "Sheet1!A2:C2", "values": [["Alice", "30", "Engineer"]] },
 *         { "range": "Sheet1!A3:C3", "values": [["Bob",   "25", "Designer"]] }
 *       ]
 *     }
 *   ]
 * }
 * ```
 */
export function parseSheetEdits(content: string): ParsedEdits {
  // Match the fenced block (case-insensitive fence label)
  const FENCE_RE = /```sheet_edit\s*([\s\S]*?)```/i;
  const match = content.match(FENCE_RE);
  console.log('match', match)
  console.log('content', content)

  if (!match) {
    return { edits: [], cleanContent: content };
  }

  let edits: SheetEditInstruction[] = [];

  try {
    const parsed = JSON.parse(match[1].trim());
    console.log('parsed', parsed)
    if (Array.isArray(parsed.edits)) {
      edits = parsed.edits.filter(isValidEditInstruction);
    }
  } catch {
    // Malformed JSON — skip edits, keep full response
    return { edits: [], cleanContent: content };
  }

  // Strip the JSON block from the displayed response
  const cleanContent = content.replace(FENCE_RE, '').replace(/\n{3,}/g, '\n\n').trim();

  return { edits, cleanContent };
}

// ─── Validation ─────────────────────────────────────────────────────────────────
function isValidEditInstruction(x: unknown): x is SheetEditInstruction {
  if (!x || typeof x !== 'object') return false;
  const obj = x as Record<string, unknown>;

  if (typeof obj.spreadsheetId !== 'string' || !obj.spreadsheetId) return false;
  if (!Array.isArray(obj.updates)) return false;

  return obj.updates.every(
    (u) =>
      u &&
      typeof u === 'object' &&
      typeof (u as any).range === 'string' &&
      Array.isArray((u as any).values),
  );
}