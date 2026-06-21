import { useCallback } from 'react';
import { getAccessToken } from './useGoogleAuth';

const BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

export interface SheetTab {
  sheetId:     number;
  title:       string;
  rowCount:    number;
  columnCount: number;
  values:      string[][];
}

export interface SpreadsheetData {
  spreadsheetId: string;
  title:         string;
  sheets:        SheetTab[];
}

export interface CellUpdate {
  range:  string;
  values: string[][];
}

export function useGoogleSheets() {
  const authHeaders = useCallback(
    (): Record<string, string> => ({
      Authorization:  `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    }),
    [],
  );

  const getSheetContent = useCallback(
    async (spreadsheetId: string): Promise<SpreadsheetData> => {
      // ── Step 1: fetch metadata including grid dimensions ─────────────────────
      // gridProperties gives us exact rowCount + columnCount per tab
      const metaRes = await fetch(
        `${BASE}/${spreadsheetId}?fields=spreadsheetId,properties.title,sheets(properties(title,sheetId,gridProperties))`,
        { headers: authHeaders() },
      );
      if (!metaRes.ok) throw new Error(`getSheetContent meta: ${await metaRes.text()}`);
      const meta = await metaRes.json();

      type SheetMeta = {
        title:       string;
        sheetId:     number;
        rowCount:    number;
        columnCount: number;
      };

      const sheetMetas: SheetMeta[] = meta.sheets.map((s: any) => ({
        title:       s.properties.title       as string,
        sheetId:     s.properties.sheetId     as number,
        rowCount:    s.properties.gridProperties?.rowCount    ?? 1000,
        columnCount: s.properties.gridProperties?.columnCount ?? 26,
      }));

      // ── Step 2: build explicit A1:XX ranges so leading empty rows/cols are kept
      //
      // BUG we are fixing: passing only the sheet title as the range makes the
      // API return only the "used range", which SKIPS any empty rows or columns
      // at the top/left of the sheet.
      //
      // Fix: anchor every range at A1 and use the sheet's actual column count so
      // the API always returns data starting from cell A1.
      //
      const columnIndexToLetter = (n: number): string => {
        // n is 1-based column count → convert to A1 letter (e.g. 26→Z, 27→AA)
        let result = '';
        while (n > 0) {
          const rem = (n - 1) % 26;
          result = String.fromCharCode(65 + rem) + result;
          n = Math.floor((n - 1) / 26);
        }
        return result || 'Z';
      };

      const params = new URLSearchParams();
      sheetMetas.forEach(({ title, rowCount, columnCount }) => {
        // Add a small buffer to both dimensions so newly added rows/cols are caught
        const lastCol = columnIndexToLetter(Math.min(columnCount + 5, 702)); // ZZ max
        const lastRow = Math.min(rowCount + 10, 10_000);
        // Quote the title to handle spaces and special characters
        params.append('ranges', `'${title.replace(/'/g, "\\'")}'!A1:${lastCol}${lastRow}`);
      });
      params.set('valueRenderOption', 'FORMATTED_VALUE');

      // ── Step 3: batch-read all tabs ──────────────────────────────────────────
      const valRes = await fetch(`${BASE}/${spreadsheetId}/values:batchGet?${params}`, {
        headers: authHeaders(),
      });
      if (!valRes.ok) throw new Error(`getSheetContent values: ${await valRes.text()}`);
      const { valueRanges } = await valRes.json();

      return {
        spreadsheetId: meta.spreadsheetId,
        title:         meta.properties.title,
        sheets: sheetMetas.map((s, i) => {
          const rawValues: string[][] = valueRanges?.[i]?.values ?? [];

          // Normalize: the API strips trailing empty cells from each row.
          // Re-pad every row to the width of the widest row so the table is rectangular.
          const maxCols = rawValues.reduce((m, row) => Math.max(m, row.length), 0);
          const normalizedValues = rawValues.map((row) => {
            const padded = [...row];
            while (padded.length < maxCols) padded.push('');
            return padded;
          });

          return {
            sheetId:     s.sheetId,
            title:       s.title,
            rowCount:    s.rowCount,
            columnCount: s.columnCount,
            values:      normalizedValues,
          };
        }),
      };
    },
    [authHeaders],
  );

  const editSheet = useCallback(
    async (spreadsheetId: string, updates: CellUpdate[]): Promise<void> => {
      const res = await fetch(`${BASE}/${spreadsheetId}/values:batchUpdate`, {
        method:  'POST',
        headers: authHeaders(),
        body:    JSON.stringify({ valueInputOption: 'USER_ENTERED', data: updates }),
      });
      if (!res.ok) throw new Error(`editSheet: ${await res.text()}`);
    },
    [authHeaders],
  );

  const appendRows = useCallback(
    async (spreadsheetId: string, range: string, values: string[][]): Promise<void> => {
      const url = `${BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}:append`
        + '?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS';
      const res = await fetch(url, {
        method:  'POST',
        headers: authHeaders(),
        body:    JSON.stringify({ values }),
      });
      if (!res.ok) throw new Error(`appendRows: ${await res.text()}`);
    },
    [authHeaders],
  );

  const clearRange = useCallback(
    async (spreadsheetId: string, range: string): Promise<void> => {
      const res = await fetch(
        `${BASE}/${spreadsheetId}/values/${encodeURIComponent(range)}:clear`,
        { method: 'POST', headers: authHeaders() },
      );
      if (!res.ok) throw new Error(`clearRange: ${await res.text()}`);
    },
    [authHeaders],
  );

  return { getSheetContent, editSheet, appendRows, clearRange };
}