import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DriveFile, FolderState, SelectedDriveFile,
  isSupported,
} from '@/types/drive';
import { useDriveAPI } from './useDriveAPI';

// ─── Public contract ────────────────────────────────────────────────────────────
export interface UseFileExplorerReturn {
  rootItems:       DriveFile[];
  rootLoading:     boolean;
  rootError:       string | undefined;
  expandedFolders: Set<string>;
  folderContents:  Map<string, FolderState>;
  customRootId:    string | null;
  customRootName:  string | null;

  refreshRoot:     () => Promise<void>;
  toggleFolder:    (folderId: string) => Promise<void>;
  refreshFolder:   (folderId: string) => Promise<void>;
  uploadToFolder:  (file: File, parentId: string, onProgress?: (pct: number) => void) => Promise<void>;
  makeFolder:      (name: string, parentId: string) => Promise<void>;
  deleteItem:      (fileId: string, parentId: string) => Promise<void>;
  downloadItem:    (fileId: string, name: string) => Promise<void>;
  setAsRoot:       (folder: DriveFile) => Promise<void>;
  unRoot:          () => Promise<void>;

  selectedFileIds:       Set<string>;
  selectedFiles:         SelectedDriveFile[];
  toggleFileSelection:   (file: DriveFile) => void;
  toggleFolderSelection: (folderId: string) => void;
  getFolderCheckState:   (folderId: string) => 'none' | 'partial' | 'all';
  clearSelection:        () => void;
}

// ─── Hook ───────────────────────────────────────────────────────────────────────
/**
 * @param isSignedIn - Pass the value from useGoogleAuth().isSignedIn.
 *   The hook won't attempt any API calls until this is true.
 */
export function useFileExplorer(isSignedIn: boolean): UseFileExplorerReturn {
  const api = useDriveAPI();

  const [rootItems,       setRootItems]       = useState<DriveFile[]>([]);
  const [rootLoading,     setRootLoading]     = useState(false);
  const [rootError,       setRootError]       = useState<string | undefined>();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [folderContents,  setFolderContents]  = useState<Map<string, FolderState>>(new Map());
  const [customRootId,    setCustomRootId]    = useState<string | null>(null);
  const [customRootName,  setCustomRootName]  = useState<string | null>(null);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(new Set());

  // Metadata cache for selected files — ref because we only need it when deriving selectedFiles
  const filesByIdRef = useRef<Map<string, DriveFile>>(new Map());

  const selectedFiles = useMemo<SelectedDriveFile[]>(
    () =>
      Array.from(selectedFileIds)
        .map((id) => filesByIdRef.current.get(id))
        .filter((f): f is DriveFile => !!f && isSupported(f))
        .map((f) => ({ id: f.id, name: f.name, mimeType: f.mimeType, webViewLink: f.webViewLink })),
    [selectedFileIds],
  );

  // ── Private helpers ──────────────────────────────────────────────────────────
  const registerFiles = (files: DriveFile[]) =>
    files.forEach((f) => filesByIdRef.current.set(f.id, f));

  const fetchRoot = useCallback(
    async (folderId: string) => {
      setRootLoading(true);
      setRootError(undefined);
      try {
        const files = await api.listFiles(folderId);
        registerFiles(files);
        setRootItems(files);
      } catch (e: any) {
        setRootError(e.message);
      } finally {
        setRootLoading(false);
      }
    },
    [api],
  );

  const fetchFolder = useCallback(
    async (folderId: string) => {
      setFolderContents((prev) => {
        const next = new Map(prev);
        const cur  = next.get(folderId);
        next.set(folderId, { files: cur?.files ?? [], isLoaded: false, isLoading: true });
        return next;
      });
      try {
        const files = await api.listFiles(folderId);
        registerFiles(files);
        setFolderContents((prev) => {
          const next = new Map(prev);
          next.set(folderId, { files, isLoaded: true, isLoading: false });
          return next;
        });
      } catch (e: any) {
        setFolderContents((prev) => {
          const next = new Map(prev);
          next.set(folderId, { files: [], isLoaded: false, isLoading: false, error: e.message });
          return next;
        });
      }
    },
    [api],
  );

  // ── Public actions ───────────────────────────────────────────────────────────
  const refreshRoot = useCallback(
    () => fetchRoot(customRootId ?? 'root'),
    [fetchRoot, customRootId],
  );

  const refreshFolder = useCallback(
    async (folderId: string) => {
      if (folderId === 'root' || folderId === customRootId)
        await fetchRoot(customRootId ?? 'root');
      else
        await fetchFolder(folderId);
    },
    [fetchRoot, fetchFolder, customRootId],
  );

  const toggleFolder = useCallback(
    async (folderId: string) => {
      const isExpanding = !expandedFolders.has(folderId);
      setExpandedFolders((prev) => {
        const next = new Set(prev);
        isExpanding ? next.add(folderId) : next.delete(folderId);
        return next;
      });
      if (isExpanding) {
        const state = folderContents.get(folderId);
        if (!state?.isLoaded && !state?.isLoading) await fetchFolder(folderId);
      }
    },
    [expandedFolders, folderContents, fetchFolder],
  );

  const uploadToFolder = useCallback(
    async (file: File, parentId: string, onProgress?: (pct: number) => void) => {
      await api.uploadFile(file, parentId, onProgress);
      await refreshFolder(parentId);
    },
    [api, refreshFolder],
  );

  const makeFolder = useCallback(
    async (name: string, parentId: string) => {
      await api.createFolder(name, parentId);
      await refreshFolder(parentId);
    },
    [api, refreshFolder],
  );

  const deleteItem = useCallback(
    async (fileId: string, parentId: string) => {
      await api.deleteFile(fileId);
      setSelectedFileIds((prev) => { const n = new Set(prev); n.delete(fileId); return n; });
      filesByIdRef.current.delete(fileId);
      await refreshFolder(parentId);
    },
    [api, refreshFolder],
  );

  const downloadItem = useCallback(
    (fileId: string, name: string) => api.downloadFile(fileId, name),
    [api],
  );

  const setAsRoot = useCallback(
    async (folder: DriveFile) => {
      setCustomRootId(folder.id);
      setCustomRootName(folder.name);
      setExpandedFolders(new Set());
      setFolderContents(new Map());
      await fetchRoot(folder.id);
    },
    [fetchRoot],
  );

  const unRoot = useCallback(async () => {
    setCustomRootId(null);
    setCustomRootName(null);
    setExpandedFolders(new Set());
    setFolderContents(new Map());
    await fetchRoot('root');
  }, [fetchRoot]);

  // ── Selection ────────────────────────────────────────────────────────────────
  const toggleFileSelection = useCallback((file: DriveFile) => {
    if (!isSupported(file)) return;
    setSelectedFileIds((prev) => {
      const next = new Set(prev);
      next.has(file.id) ? next.delete(file.id) : next.add(file.id);
      return next;
    });
  }, []);

  const getSupportedInFolder = useCallback(
    (folderId: string) =>
      (folderContents.get(folderId)?.files ?? []).filter(isSupported),
    [folderContents],
  );

  const toggleFolderSelection = useCallback(
    (folderId: string) => {
      const supported = getSupportedInFolder(folderId);
      if (!supported.length) return;
      setSelectedFileIds((prev) => {
        const allSelected = supported.every((f) => prev.has(f.id));
        const next = new Set(prev);
        supported.forEach((f) => allSelected ? next.delete(f.id) : next.add(f.id));
        return next;
      });
    },
    [getSupportedInFolder],
  );

  const getFolderCheckState = useCallback(
    (folderId: string): 'none' | 'partial' | 'all' => {
      const supported = getSupportedInFolder(folderId);
      if (!supported.length) return 'none';
      const count = supported.filter((f) => selectedFileIds.has(f.id)).length;
      if (count === 0) return 'none';
      return count === supported.length ? 'all' : 'partial';
    },
    [getSupportedInFolder, selectedFileIds],
  );

  const clearSelection = useCallback(() => setSelectedFileIds(new Set()), []);

  // ── Bootstrap: wait for sign-in ──────────────────────────────────────────────
  useEffect(() => {
    if (!isSignedIn) return;
    fetchRoot('root');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return {
    rootItems, rootLoading, rootError,
    expandedFolders, folderContents,
    customRootId, customRootName,
    refreshRoot, toggleFolder, refreshFolder,
    uploadToFolder, makeFolder, deleteItem, downloadItem,
    setAsRoot, unRoot,
    selectedFileIds, selectedFiles,
    toggleFileSelection, toggleFolderSelection, getFolderCheckState, clearSelection,
  };
}