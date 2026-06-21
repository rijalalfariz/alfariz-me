'use client';

import { useEffect, useState } from 'react';
import { VscRefresh }                from 'react-icons/vsc';
import { VscHome }                   from 'react-icons/vsc';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SiGooglesheets }            from 'react-icons/si';
import { FcGoogle }                  from 'react-icons/fc';

import { SelectedDriveFile, isFolder } from '@/types/drive';
import { useGoogleAuth }               from '@/hooks/useGoogleAuth';
import { useFileExplorer }             from '@/hooks/useFileExplorer';
import { Toolbar }                     from './Toolbar';
import { FolderItem, TreeHandlers }    from './FolderItem';
import { FileItem }                    from './FileItem';

// ─── Props ──────────────────────────────────────────────────────────────────────
interface Props {
  /** Called whenever the file selection changes. Feed this into your AI context. */
  onSelectionChange?: (files: SelectedDriveFile[]) => void;
  className?:         string;
}

// ─── Component ──────────────────────────────────────────────────────────────────
export function FileExplorer({ onSelectionChange, className = '' }: Props) {
  const auth     = useGoogleAuth();
  const explorer = useFileExplorer(auth.isSignedIn);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 5_000);
  };

  // Notify parent on selection change
  useEffect(() => {
    onSelectionChange?.(explorer.selectedFiles);
  }, [explorer.selectedFiles]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Shared handler bundle ────────────────────────────────────────────────────
  const treeHandlers: TreeHandlers = {
    selectedFileIds:      explorer.selectedFileIds,
    expandedFolders:      explorer.expandedFolders,
    folderContents:       explorer.folderContents,
    customRootId:         explorer.customRootId,
    onToggleFolder:       explorer.toggleFolder,
    onRefreshFolder:      explorer.refreshFolder,
    onSetAsRoot:          explorer.setAsRoot,
    onUnRoot:             explorer.unRoot,
    onDelete:             explorer.deleteItem,
    onDownload:           explorer.downloadItem,
    onToggleFileSelect:   explorer.toggleFileSelection,
    onToggleFolderSelect: explorer.toggleFolderSelection,
    getFolderCheckState:  explorer.getFolderCheckState,
    onError,
  };

  const selectedCount = explorer.selectedFileIds.size;

  return (
    <div
      className={`
        flex flex-col h-full
        bg-[#252526] border border-[#3e3e42]
        rounded overflow-hidden text-[#cccccc]
        select-none font-sans
        ${className}
      `}
    >
      {/* ── Header ────────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#3e3e42] flex-shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          {explorer.customRootId && (
            <button
              onClick={() => explorer.unRoot().catch((e) => onError(e.message))}
              title="Back to Drive root"
              className="text-[#858585] hover:text-[#cccccc] transition-colors flex-shrink-0"
            >
              <VscHome size={13} />
            </button>
          )}
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#858585] truncate">
            {explorer.customRootName ?? 'Google Drive'}
          </span>
          {explorer.customRootName && (
            <span className="text-[10px] text-blue-400 flex-shrink-0">root</span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Clear selection */}
          {selectedCount > 0 && (
            <button
              onClick={explorer.clearSelection}
              className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear ({selectedCount})
            </button>
          )}

          {/* Refresh — only when signed in */}
          {auth.isSignedIn && (
            <button
              onClick={() => explorer.refreshRoot().catch((e) => onError(e.message))}
              title="Refresh"
              className="p-1 rounded hover:bg-[#3e3e42] text-[#858585] hover:text-[#cccccc] transition-colors"
            >
              <VscRefresh size={13} className={explorer.rootLoading ? 'animate-spin' : ''} />
            </button>
          )}

          {/* Sign in / out */}
          {auth.isReady && (
            <button
              onClick={auth.isSignedIn ? auth.signOut : auth.signIn}
              title={auth.isSignedIn ? 'Sign out of Google' : 'Sign in with Google'}
              className="
                flex items-center gap-1 px-1.5 py-0.5 rounded
                text-[10px] text-[#858585] hover:text-[#cccccc]
                hover:bg-[#3e3e42] transition-colors
              "
            >
              <FcGoogle size={13} />
              {auth.isSignedIn ? 'Sign out' : 'Sign in'}
            </button>
          )}
        </div>
      </div>

      {/* ── Signed-out splash ──────────────────────────────────────────────────── */}
      {!auth.isSignedIn && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 text-center">
          {!auth.isReady ? (
            <AiOutlineLoading3Quarters size={20} className="animate-spin text-[#858585]" />
          ) : (
            <>
              <FcGoogle size={36} />
              <p className="text-[13px] text-[#858585] leading-relaxed">
                Connect your Google Drive to select spreadsheets as AI context.
              </p>
              <button
                onClick={auth.signIn}
                className="
                  flex items-center gap-2 px-4 py-2
                  bg-white text-[#3c4043] text-sm font-medium
                  rounded shadow hover:shadow-md
                  transition-shadow
                "
              >
                <FcGoogle size={16} />
                Sign in with Google
              </button>
            </>
          )}
        </div>
      )}

      {/* ── Toolbar (only when signed in) ─────────────────────────────────────── */}
      {auth.isSignedIn && (
        <Toolbar
          parentId={explorer.customRootId ?? 'root'}
          onUpload={explorer.uploadToFolder}
          onCreateFolder={explorer.makeFolder}
          onError={onError}
        />
      )}

      {/* ── Error toast ───────────────────────────────────────────────────────── */}
      {errorMsg && (
        <div className="
          mx-2 mt-1.5 px-2.5 py-1.5 flex-shrink-0
          text-[11px] text-red-300
          bg-red-900/30 border border-red-800/50 rounded
        ">
          {errorMsg}
        </div>
      )}

      {/* ── File tree ─────────────────────────────────────────────────────────── */}
      {auth.isSignedIn && (
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-1 min-h-0">

          {/* Root loading */}
          {explorer.rootLoading && explorer.rootItems.length === 0 && (
            <div className="flex items-center justify-center gap-2 py-10 text-[#858585] text-xs">
              <AiOutlineLoading3Quarters size={14} className="animate-spin" />
              Loading Drive…
            </div>
          )}

          {/* Root error */}
          {explorer.rootError && (
            <p className="px-3 py-4 text-red-400 text-xs">{explorer.rootError}</p>
          )}

          {/* Empty root */}
          {!explorer.rootLoading && !explorer.rootError && explorer.rootItems.length === 0 && (
            <p className="px-3 py-4 text-[#585858] text-xs italic">No files found</p>
          )}

          {/* Tree nodes */}
          {explorer.rootItems.map((item) =>
            isFolder(item) ? (
              <FolderItem
                key={item.id}
                folder={item}
                depth={0}
                parentId={explorer.customRootId ?? 'root'}
                {...treeHandlers}
              />
            ) : (
              <FileItem
                key={item.id}
                file={item}
                depth={0}
                parentId={explorer.customRootId ?? 'root'}
                isSelected={explorer.selectedFileIds.has(item.id)}
                onToggleSelect={explorer.toggleFileSelection}
                onDelete={explorer.deleteItem}
                onDownload={explorer.downloadItem}
                onError={onError}
              />
            ),
          )}
        </div>
      )}

      {/* ── Footer: context summary ───────────────────────────────────────────── */}
      {auth.isSignedIn && selectedCount > 0 && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-t border-[#3e3e42] flex-shrink-0">
          <SiGooglesheets size={11} className="text-emerald-400" />
          <span className="text-[10px] text-[#858585]">
            {selectedCount} file{selectedCount !== 1 ? 's' : ''} selected as AI context
          </span>
        </div>
      )}
    </div>
  );
}

// Re-export for consumers
export { useGoogleAuth }   from '@/hooks/useGoogleAuth';
export { useGoogleSheets } from '@/hooks/useGoogleSheets';
export type { SelectedDriveFile } from '@/types/drive';