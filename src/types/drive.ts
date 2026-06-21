// ─── MIME constants ────────────────────────────────────────────────────────────
export const MIME = {
  FOLDER:      'application/vnd.google-apps.folder',
  SPREADSHEET: 'application/vnd.google-apps.spreadsheet',
  DOCUMENT:    'application/vnd.google-apps.document',
  PDF:         'application/pdf',
} as const;

/** File types that can be added to the AI context window (v1: spreadsheets only) */
export const SUPPORTED_MIME_TYPES: readonly string[] = [MIME.SPREADSHEET];

// ─── Core models ───────────────────────────────────────────────────────────────
export interface DriveFile {
  id:            string;
  name:          string;
  mimeType:      string;
  size?:         string;        // bytes as string (absent for Google Docs types)
  modifiedTime?: string;        // ISO 8601
  createdTime?:  string;
  parents?:      string[];
  webViewLink?:  string;
}

/** State cached per folder (children are loaded lazily) */
export interface FolderState {
  files:     DriveFile[];
  isLoaded:  boolean;
  isLoading: boolean;
  error?:    string;
}

/** Slim object exposed to the AI as "selected context" – no file content */
export interface SelectedDriveFile {
  id:           string;
  name:         string;
  mimeType:     string;
  webViewLink?: string;
}

// ─── Type guards ───────────────────────────────────────────────────────────────
export const isFolder    = (f: DriveFile): boolean => f.mimeType === MIME.FOLDER;
export const isSupported = (f: DriveFile): boolean => SUPPORTED_MIME_TYPES.includes(f.mimeType);

// ─── Formatting helpers ────────────────────────────────────────────────────────
export function formatSize(size?: string): string {
  if (!size) return '';
  const b = parseInt(size, 10);
  if (b < 1_024)           return `${b} B`;
  if (b < 1_048_576)       return `${(b / 1_024).toFixed(1)} KB`;
  if (b < 1_073_741_824)   return `${(b / 1_048_576).toFixed(1)} MB`;
  return `${(b / 1_073_741_824).toFixed(2)} GB`;
}