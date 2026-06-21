import { useState } from 'react';
import {
  VscChevronRight, VscChevronDown,
  VscFolder, VscFolderOpened,
  VscRefresh, VscCloudDownload, VscTrash,
} from 'react-icons/vsc';
import { TbBookmarkPlus, TbBookmarkMinus } from 'react-icons/tb';
import { AiOutlineLoading3Quarters }        from 'react-icons/ai';

import { DriveFile, FolderState, isFolder }  from '@/types/drive';
import { KebabMenu, MenuAction }              from './KebabMenu';
import { TriStateCheckbox }                   from './TriStateCheckbox';
import { FileItem }                           from './FileItem';

// ─── Shared prop bundle passed down the recursive tree ──────────────────────────
export interface TreeHandlers {
  selectedFileIds:       Set<string>;
  expandedFolders:       Set<string>;
  folderContents:        Map<string, FolderState>;
  customRootId:          string | null;

  onToggleFolder:        (folderId: string) => Promise<void>;
  onRefreshFolder:       (folderId: string) => Promise<void>;
  onSetAsRoot:           (folder: DriveFile) => Promise<void>;
  onUnRoot:              () => Promise<void>;
  onDelete:              (fileId: string, parentId: string) => Promise<void>;
  onDownload:            (fileId: string, name: string) => Promise<void>;
  onToggleFileSelect:    (file: DriveFile) => void;
  onToggleFolderSelect:  (folderId: string) => void;
  getFolderCheckState:   (folderId: string) => 'none' | 'partial' | 'all';
  onError:               (msg: string) => void;
}

interface Props extends TreeHandlers {
  folder:    DriveFile;
  depth:     number;
  parentId:  string;
}

export function FolderItem({
  folder, depth, parentId,
  // tree context
  selectedFileIds, expandedFolders, folderContents, customRootId,
  onToggleFolder, onRefreshFolder, onSetAsRoot, onUnRoot,
  onDelete, onDownload,
  onToggleFileSelect, onToggleFolderSelect, getFolderCheckState,
  onError,
}: Props) {
  const [refreshing, setRefreshing] = useState(false);

  const isExpanded  = expandedFolders.has(folder.id);
  const folderState = folderContents.get(folder.id);
  const checkState  = getFolderCheckState(folder.id);
  const isCustomRoot = customRootId === folder.id;

  // ── Kebab actions ─────────────────────────────────────────────────────────────
  const handleRefresh = async () => {
    setRefreshing(true);
    try { await onRefreshFolder(folder.id); }
    catch (e: any) { onError(e.message); }
    finally { setRefreshing(false); }
  };

  const actions: MenuAction[] = [
    {
      icon:    refreshing
                 ? <AiOutlineLoading3Quarters size={13} className="animate-spin" />
                 : <VscRefresh size={13} />,
      label:   'Refresh',
      onClick: handleRefresh,
    },
    {
      icon:    isCustomRoot
                 ? <TbBookmarkMinus size={13} />
                 : <TbBookmarkPlus  size={13} />,
      label:   isCustomRoot ? 'Un-root' : 'Set as root',
      onClick: isCustomRoot
                 ? async () => { try { await onUnRoot();           } catch (e: any) { onError(e.message); } }
                 : async () => { try { await onSetAsRoot(folder);  } catch (e: any) { onError(e.message); } },
    },
    {
      icon:    <VscCloudDownload size={13} />,
      label:   'Download',
      onClick: async () => {
        try { await onDownload(folder.id, folder.name); }
        catch (e: any) { onError(e.message); }
      },
    },
    {
      icon:    <VscTrash size={13} />,
      label:   'Delete',
      danger:  true,
      onClick: async () => {
        if (!window.confirm(`Delete folder "${folder.name}" and all its contents?`)) return;
        try { await onDelete(folder.id, parentId); }
        catch (e: any) { onError(e.message); }
      },
    },
  ];

  // ── Shared handler props passed to child nodes ─────────────────────────────
  const childHandlers: TreeHandlers = {
    selectedFileIds, expandedFolders, folderContents, customRootId,
    onToggleFolder, onRefreshFolder, onSetAsRoot, onUnRoot,
    onDelete, onDownload,
    onToggleFileSelect, onToggleFolderSelect, getFolderCheckState,
    onError,
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Folder row ────────────────────────────────────────────────────────── */}
      <div
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
        onClick={() => onToggleFolder(folder.id).catch((e) => onError(e.message))}
        className="
          group flex items-center gap-1 pr-1 py-[3px]
          cursor-pointer select-none
          hover:bg-[#2a2d2e] transition-colors
        "
      >
        {/* Expand chevron */}
        <span className="w-3.5 flex-shrink-0 text-[#858585]">
          {folderState?.isLoading && !isExpanded
            ? <AiOutlineLoading3Quarters size={11} className="animate-spin" />
            : isExpanded
              ? <VscChevronDown  size={13} />
              : <VscChevronRight size={13} />}
        </span>

        {/* Tri-state checkbox — click does NOT propagate to row toggle */}
        <div
          className="w-4 flex-shrink-0 flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); onToggleFolderSelect(folder.id); }}
        >
          <TriStateCheckbox
            state={checkState}
            disabled={!folderState?.isLoaded}
            onChange={() => onToggleFolderSelect(folder.id)}
          />
        </div>

        {/* Folder icon */}
        {isExpanded
          ? <VscFolderOpened size={14} className="text-yellow-300 flex-shrink-0" />
          : <VscFolder       size={14} className="text-yellow-300 flex-shrink-0" />}

        {/* Name */}
        <span className="flex-1 truncate text-[#cccccc] text-xs font-medium">
          {folder.name}
        </span>

        {/* Custom-root badge */}
        {isCustomRoot && (
          <span className="text-[10px] text-blue-400 flex-shrink-0 px-1">root</span>
        )}

        {/* Inline loading spinner when already open and refreshing */}
        {folderState?.isLoading && isExpanded && (
          <AiOutlineLoading3Quarters size={11} className="animate-spin text-[#858585] flex-shrink-0" />
        )}

        {/* Kebab — click blocked from reaching the row */}
        <div
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <KebabMenu actions={actions} />
        </div>
      </div>

      {/* ── Children ──────────────────────────────────────────────────────────── */}
      {isExpanded && (
        <div>
          {/* Loading placeholder */}
          {folderState?.isLoading && !folderState.files.length && (
            <div
              style={{ paddingLeft: `${(depth + 1) * 12 + 24}px` }}
              className="flex items-center gap-1.5 text-[#858585] text-[11px] py-1"
            >
              <AiOutlineLoading3Quarters size={11} className="animate-spin" />
              Loading…
            </div>
          )}

          {/* Error */}
          {folderState?.error && (
            <p
              style={{ paddingLeft: `${(depth + 1) * 12 + 24}px` }}
              className="text-red-400 text-[11px] py-1 pr-2"
            >
              {folderState.error}
            </p>
          )}

          {/* Empty state */}
          {folderState?.isLoaded && folderState.files.length === 0 && (
            <p
              style={{ paddingLeft: `${(depth + 1) * 12 + 24}px` }}
              className="text-[#585858] text-[11px] py-1 italic"
            >
              Empty folder
            </p>
          )}

          {/* Recursive children */}
          {folderState?.files.map((child) =>
            isFolder(child) ? (
              <FolderItem
                key={child.id}
                folder={child}
                depth={depth + 1}
                parentId={folder.id}
                {...childHandlers}
              />
            ) : (
              <FileItem
                key={child.id}
                file={child}
                depth={depth + 1}
                parentId={folder.id}
                isSelected={selectedFileIds.has(child.id)}
                onToggleSelect={onToggleFileSelect}
                onDelete={onDelete}
                onDownload={onDownload}
                onError={onError}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}