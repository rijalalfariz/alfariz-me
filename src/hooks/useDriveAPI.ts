import { useCallback } from 'react';
import { DriveFile, MIME } from '@/types/drive';
import { getAccessToken } from './useGoogleAuth';

// ─── Constants ─────────────────────────────────────────────────────────────────
const DRIVE  = 'https://www.googleapis.com/drive/v3';
const UPLOAD = 'https://www.googleapis.com/upload/drive/v3';
const FIELDS = 'id,name,mimeType,size,modifiedTime,createdTime,parents,webViewLink';

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useDriveAPI() {
  /** Build Authorization headers using the gapi token */
  const authHeaders = useCallback(
    (): Record<string, string> => ({
      Authorization:  `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    }),
    [],
  );

  // ── List files ───────────────────────────────────────────────────────────────
  const listFiles = useCallback(
    async (folderId = 'root'): Promise<DriveFile[]> => {
      const params = new URLSearchParams({
        q:        `'${folderId}' in parents and trashed = false`,
        fields:   `files(${FIELDS})`,
        orderBy:  'folder,name',
        pageSize: '1000',
      });
      const res = await fetch(`${DRIVE}/files?${params}`, { headers: authHeaders() });
      if (!res.ok) throw new Error(`listFiles: ${await res.text()}`);
      const { files } = await res.json();
      return files as DriveFile[];
    },
    [authHeaders],
  );

  // ── Upload file (multipart, with XHR progress) ───────────────────────────────
  const uploadFile = useCallback(
    (
      file:       File,
      parentId =  'root',
      onProgress?: (pct: number) => void,
    ): Promise<DriveFile> => {
      const token = getAccessToken(); // throws if not authed

      const metadata = { name: file.name, parents: [parentId] };
      const form     = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${UPLOAD}/files?uploadType=multipart&fields=${FIELDS}`);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) onProgress?.((e.loaded / e.total) * 100);
        };
        xhr.onload = () =>
          xhr.status >= 200 && xhr.status < 300
            ? resolve(JSON.parse(xhr.responseText) as DriveFile)
            : reject(new Error(`upload ${xhr.status}: ${xhr.responseText}`));
        xhr.onerror = () => reject(new Error('Network error during upload'));
        xhr.send(form);
      });
    },
    [],
  );

  // ── Create folder ────────────────────────────────────────────────────────────
  const createFolder = useCallback(
    async (name: string, parentId = 'root'): Promise<DriveFile> => {
      const res = await fetch(`${DRIVE}/files?fields=${FIELDS}`, {
        method:  'POST',
        headers: authHeaders(),
        body:    JSON.stringify({ name, mimeType: MIME.FOLDER, parents: [parentId] }),
      });
      if (!res.ok) throw new Error(`createFolder: ${await res.text()}`);
      return res.json();
    },
    [authHeaders],
  );

  // ── Delete file / folder ─────────────────────────────────────────────────────
  const deleteFile = useCallback(
    async (fileId: string): Promise<void> => {
      const res = await fetch(`${DRIVE}/files/${fileId}`, {
        method:  'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok && res.status !== 204)
        throw new Error(`deleteFile: ${await res.text()}`);
    },
    [authHeaders],
  );

  // ── Download file ────────────────────────────────────────────────────────────
  const downloadFile = useCallback(
    async (fileId: string, name: string): Promise<void> => {
      const res = await fetch(`${DRIVE}/files/${fileId}?alt=media`, { headers: authHeaders() });
      if (!res.ok) throw new Error(`downloadFile: ${await res.text()}`);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = Object.assign(document.createElement('a'), { href: url, download: name });
      a.click();
      URL.revokeObjectURL(url);
    },
    [authHeaders],
  );

  return { listFiles, uploadFile, createFolder, deleteFile, downloadFile };
}