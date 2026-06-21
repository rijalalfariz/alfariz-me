import { useCallback } from 'react';
import { getAccessToken } from './useGoogleAuth';

const BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

// ─── Public types ───────────────────────────────────────────────────────────────
export interface SheetTab {
  sheetId: number;
  title:   string;
  values:  string[][];  // rows × columns, FORMATTED_VALUE
}

export interface SpreadsheetData {
  spreadsheetId: string;
  title:         string;
  sheets:        SheetTab[];
}

/** Single range update in A1 notation, e.g. "Sheet1!A1:D5" */
export interface CellUpdate {
  range:  string;
  values: string[][];
}

// ─── Hook ───────────────────────────────────────────────────────────────────────
export function useGoogleSheets() {
  const authHeaders = useCallback(
    (): Record<string, string> => ({
      Authorization:  `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    }),
    [],
  );

  // ── Read ─────────────────────────────────────────────────────────────────────
  /**
   * Fetch the full content of a spreadsheet (all tabs, all rows).
   * Called by the AI layer — NOT triggered from the file explorer itself.
   */
  const getSheetContent = useCallback(
    async (spreadsheetId: string): Promise<SpreadsheetData> => {
      // Step 1: fetch sheet metadata (titles, sheetIds)
      const metaRes = await fetch(
        `${BASE}/${spreadsheetId}?fields=spreadsheetId,properties.title,sheets.properties`,
        { headers: authHeaders() },
      );
      if (!metaRes.ok) throw new Error(`getSheetContent meta: ${await metaRes.text()}`);
      const meta = await metaRes.json();

      const sheetTitles: string[] = meta.sheets.map((s: any) => s.properties.title);

      // Step 2: batch-read all tabs in one request
      const params = new URLSearchParams();
      sheetTitles.forEach((t) => params.append('ranges', t));
      params.set('valueRenderOption', 'FORMATTED_VALUE');

      const valRes = await fetch(`${BASE}/${spreadsheetId}/values:batchGet?${params}`, {
        headers: authHeaders(),
      });
      if (!valRes.ok) throw new Error(`getSheetContent values: ${await valRes.text()}`);
      const { valueRanges } = await valRes.json();

      return {
        spreadsheetId: meta.spreadsheetId,
        title:         meta.properties.title,
        sheets:        meta.sheets.map((s: any, i: number) => ({
          sheetId: s.properties.sheetId,
          title:   s.properties.title,
          values:  valueRanges?.[i]?.values ?? [],
        })),
      };
    },
    [authHeaders],
  );

  // ── Write ────────────────────────────────────────────────────────────────────
  /** Batch-update one or more cell ranges */
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

  /** Append rows below existing data in a range */
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

  /** Clear a cell range */
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