import { SpreadsheetData } from '@/hooks/useGoogleSheets';

/**
 * Converts spreadsheet data into a compact, AI-readable text block.
 *
 * Handles:
 * - Sheets where row 1 or column A are empty (leading blank rows/cols preserved)
 * - Rows of unequal length (already normalized in getSheetContent)
 * - Very wide/tall sheets (truncated with a notice to avoid token overflow)
 */

const MAX_ROWS    = 500;   // rows per tab sent to AI
const MAX_COLS    = 50;    // columns per tab
const MAX_COL_W   = 40;   // character width cap per cell

export function formatSheetForAI(data: SpreadsheetData): string {
  const lines: string[] = [
    `## Spreadsheet: "${data.title}"`,
    `## ID: ${data.spreadsheetId}`,
  ];

  for (const sheet of data.sheets) {
    lines.push(`\n### Tab: "${sheet.title}"`);

    // Find the actual content bounds — first/last non-empty row and column
    const { values } = sheet;

    if (!values.length) {
      lines.push('(empty — no data found)');
      continue;
    }

    // Determine effective column count (ignore fully-empty trailing columns)
    const effectiveCols = values.reduce((max, row) => {
      const lastNonEmpty = row.reduceRight(
        (found, cell, i) => (found === -1 && cell.trim() !== '' ? i : found), -1
      );
      return Math.max(max, lastNonEmpty + 1);
    }, 0);

    // Determine effective row count (ignore fully-empty trailing rows)
    let effectiveRows = values.length;
    while (effectiveRows > 0 && values[effectiveRows - 1].every(c => c.trim() === '')) {
      effectiveRows--;
    }

    if (effectiveCols === 0 || effectiveRows === 0) {
      lines.push(`(sheet has ${sheet.rowCount} rows × ${sheet.columnCount} columns in the grid, but all cells are empty)`);
      continue;
    }

    // Warn if truncating
    const colsTrunc = effectiveCols > MAX_COLS;
    const rowsTrunc = effectiveRows > MAX_ROWS;
    const colCount  = Math.min(effectiveCols, MAX_COLS);
    const rowCount  = Math.min(effectiveRows, MAX_ROWS);

    lines.push(`Rows: ${effectiveRows}, Columns: ${effectiveCols}${rowsTrunc || colsTrunc ? ` (showing first ${rowCount} rows × ${colCount} cols)` : ''}`);
    lines.push('');

    // Compute column widths from the visible slice
    const slice = values.slice(0, rowCount).map(r => r.slice(0, colCount));
    const colWidths = Array.from({ length: colCount }, (_, ci) =>
      Math.min(
        MAX_COL_W,
        Math.max(1, ...slice.map(r => (r[ci] ?? '').length))
      )
    );

    const pad     = (s: string, w: number) => s.slice(0, w).padEnd(w);
    const divider = colWidths.map(w => '-'.repeat(w)).join(' | ');
    const rowToStr = (row: string[]) =>
      colWidths.map((w, i) => pad(row[i] ?? '', w)).join(' | ');

    // Treat first row as header
    const [header, ...dataRows] = slice;
    lines.push(rowToStr(header));
    lines.push(divider);
    dataRows.forEach(row => lines.push(rowToStr(row)));
  }

  return lines.join('\n');
}