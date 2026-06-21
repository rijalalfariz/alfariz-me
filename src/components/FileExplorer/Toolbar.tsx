import { useRef, useState } from 'react';
import { VscNewFolder, VscCloudUpload } from 'react-icons/vsc';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface Props {
  /** ID of the folder files / sub-folders will be created in */
  parentId:       string;
  onUpload:       (file: File, parentId: string, onProgress?: (pct: number) => void) => Promise<void>;
  onCreateFolder: (name: string, parentId: string) => Promise<void>;
  onError:        (msg: string) => void;
}

export function Toolbar({ parentId, onUpload, onCreateFolder, onError }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading,       setUploading]       = useState(false);
  const [uploadPct,       setUploadPct]       = useState(0);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [folderName,      setFolderName]      = useState('');
  const [creatingFolder,  setCreatingFolder]  = useState(false);

  // ── Upload ────────────────────────────────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadPct(0);
    try {
      await onUpload(file, parentId, setUploadPct);
    } catch (err: any) {
      onError(err.message);
    } finally {
      setUploading(false);
      setUploadPct(0);
      e.target.value = '';
    }
  };

  // ── Create folder ─────────────────────────────────────────────────────────────
  const commitFolder = async () => {
    const name = folderName.trim();
    if (!name) return;
    setCreatingFolder(true);
    try {
      await onCreateFolder(name, parentId);
      setFolderName('');
      setShowFolderInput(false);
    } catch (err: any) {
      onError(err.message);
    } finally {
      setCreatingFolder(false);
    }
  };

  const cancelFolder = () => { setFolderName(''); setShowFolderInput(false); };

  return (
    <div className="flex flex-col gap-1 px-2 pt-1.5 pb-1 border-b border-[#3e3e42]">

      {/* Action buttons */}
      <div className="flex items-center gap-0.5">
        {/* Upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Upload file to current folder"
          className="
            flex items-center gap-1.5 px-2 py-1
            text-[11px] text-[#cccccc]
            rounded hover:bg-[#37373d]
            disabled:opacity-50
            transition-colors
          "
        >
          {uploading
            ? <AiOutlineLoading3Quarters size={12} className="animate-spin" />
            : <VscCloudUpload size={13} />}
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* New folder */}
        <button
          onClick={() => setShowFolderInput((v) => !v)}
          title="Create new folder"
          className="
            flex items-center gap-1.5 px-2 py-1
            text-[11px] text-[#cccccc]
            rounded hover:bg-[#37373d]
            transition-colors
          "
        >
          <VscNewFolder size={13} />
          New Folder
        </button>
      </div>

      {/* Upload progress bar */}
      {uploading && (
        <div className="mx-1">
          <div className="h-[2px] bg-[#3e3e42] rounded overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-[width] duration-150"
              style={{ width: `${uploadPct}%` }}
            />
          </div>
          <p className="text-[10px] text-[#858585] mt-0.5">
            Uploading… {Math.round(uploadPct)}%
          </p>
        </div>
      )}

      {/* New folder input */}
      {showFolderInput && (
        <div className="flex items-center gap-1 px-0.5">
          <input
            autoFocus
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter')  commitFolder();
              if (e.key === 'Escape') cancelFolder();
            }}
            placeholder="Folder name…"
            className="
              flex-1 min-w-0
              bg-[#3c3c3c] text-[#cccccc] text-xs
              rounded px-2 py-1
              border border-[#3e3e42] focus:border-blue-500
              outline-none placeholder:text-[#585858]
            "
          />
          <button
            onClick={commitFolder}
            disabled={!folderName.trim() || creatingFolder}
            className="
              px-2 py-1 text-xs text-white
              bg-blue-600 hover:bg-blue-500
              rounded disabled:opacity-50
              transition-colors flex-shrink-0
            "
          >
            {creatingFolder ? '…' : 'OK'}
          </button>
          <button
            onClick={cancelFolder}
            className="
              px-2 py-1 text-xs text-[#858585]
              hover:text-[#cccccc] hover:bg-[#37373d]
              rounded transition-colors flex-shrink-0
            "
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}