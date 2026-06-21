import { VscFile, VscFilePdf } from 'react-icons/vsc';
import { SiGooglesheets }        from 'react-icons/si';
import { VscCloudDownload, VscTrash } from 'react-icons/vsc';

import { DriveFile, MIME, isSupported, formatSize } from '@/types/drive';
import { KebabMenu, MenuAction }                     from './KebabMenu';
import { TriStateCheckbox }                          from './TriStateCheckbox';

interface Props {
  file:          DriveFile;
  depth:         number;
  parentId:      string;
  isSelected:    boolean;
  onToggleSelect:(file: DriveFile) => void;
  onDelete:      (fileId: string, parentId: string) => Promise<void>;
  onDownload:    (fileId: string, name: string) => Promise<void>;
  onError:       (msg: string) => void;
}

// ── File icon by MIME type ──────────────────────────────────────────────────────
function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType === MIME.SPREADSHEET)
    return <SiGooglesheets size={13} className="text-emerald-400 flex-shrink-0" />;
  if (mimeType === MIME.PDF)
    return <VscFilePdf      size={14} className="text-red-400 flex-shrink-0"    />;
  return   <VscFile         size={14} className="text-[#858585] flex-shrink-0"  />;
}

export function FileItem({
  file, depth, parentId, isSelected,
  onToggleSelect, onDelete, onDownload, onError,
}: Props) {
  const supported = isSupported(file);

  const actions: MenuAction[] = [
    {
      icon:    <VscCloudDownload size={13} />,
      label:   'Download',
      onClick: async () => {
        try { await onDownload(file.id, file.name); }
        catch (e: any) { onError(e.message); }
      },
    },
    {
      icon:    <VscTrash size={13} />,
      label:   'Delete',
      danger:  true,
      onClick: async () => {
        if (!window.confirm(`Delete "${file.name}"?`)) return;
        try { await onDelete(file.id, parentId); }
        catch (e: any) { onError(e.message); }
      },
    },
  ];

  return (
    <div
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
      onClick={() => supported && onToggleSelect(file)}
      className={`
        group flex items-center gap-1.5 pr-1 py-[3px]
        text-xs cursor-default select-none
        transition-colors
        ${isSelected
          ? 'bg-[#094771] hover:bg-[#0e5a8a]'
          : 'hover:bg-[#2a2d2e]'}
        ${supported ? 'cursor-pointer' : ''}
      `}
    >
      {/* Checkbox (supported files only) */}
      <div className="w-4 flex-shrink-0 flex items-center justify-center">
        {supported
          ? <TriStateCheckbox
              state={isSelected ? 'all' : 'none'}
              onChange={() => onToggleSelect(file)}
            />
          : <span className="w-3.5 h-3.5" />}
      </div>

      {/* Icon */}
      <FileIcon mimeType={file.mimeType} />

      {/* Name */}
      <span className={`flex-1 truncate ${isSelected ? 'text-white' : 'text-[#cccccc]'}`}>
        {file.name}
      </span>

      {/* Size (shown on hover) */}
      {file.size && (
        <span className="text-[10px] text-[#585858] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          {formatSize(file.size)}
        </span>
      )}

      {/* Kebab */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <KebabMenu actions={actions} />
      </div>
    </div>
  );
}