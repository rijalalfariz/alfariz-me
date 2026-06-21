import { SpreadsheetData } from '@/hooks/useGoogleSheets';

/**
 * Converts spreadsheet data into a compact, AI-readable text block.
 * Uses a simple TSV format — clear enough for any LLM to understand.
 */
export function formatSheetForAI(data: SpreadsheetData): string {
  const lines: string[] = [
    `## Spreadsheet: "${data.title}" (id: ${data.spreadsheetId})`,
  ];

  for (const sheet of data.sheets) {
    lines.push(`\n### Tab: "${sheet.title}"`);

    if (!sheet.values.length) {
      lines.push('(empty)');
      continue;
    }

    // Row count info
    lines.push(`Rows: ${sheet.values.length}, Columns: ${sheet.values[0]?.length ?? 0}`);
    lines.push('');

    // Render as a markdown table if there are headers (first row)
    const [header, ...rows] = sheet.values;
    const colWidths = header.map((h, i) =>
      Math.min(
        40, // cap column width
        Math.max(h.length, ...rows.map(r => (r[i] ?? '').length))
      )
    );

    const pad = (s: string, w: number) => s.slice(0, w).padEnd(w);
    const divider = colWidths.map(w => '-'.repeat(w)).join(' | ');

    lines.push(header.map((h, i) => pad(h, colWidths[i])).join(' | '));
    lines.push(divider);
    for (const row of rows) {
      lines.push(header.map((_, i) => pad(row[i] ?? '', colWidths[i])).join(' | '));
    }
  }

  return lines.join('\n');
}