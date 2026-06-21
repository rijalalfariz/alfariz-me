import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export interface MenuAction {
  icon:      React.ReactNode;
  label:     string;
  onClick:   () => void | Promise<void>;
  danger?:   boolean;
  disabled?: boolean;
}

interface Props {
  actions: MenuAction[];
}

/**
 * A small "⋮" button that opens a floating dropdown of actions.
 * Closes on outside click or Escape. Click propagation is stopped
 * so parent row handlers don't fire when opening the menu.
 */
export function KebabMenu({ actions }: Props) {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };

    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown',     onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown',     onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Trigger */}
      <button
        onPointerDown={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        title="More actions"
        className="
          flex items-center justify-center
          w-5 h-5 rounded
          text-[#858585] hover:text-[#cccccc]
          hover:bg-[#3e3e42]
          transition-colors
        "
      >
        <BsThreeDotsVertical size={13} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute right-0 z-50 mt-0.5
            min-w-[160px]
            rounded border border-[#3e3e42]
            bg-[#1f1f1f] shadow-xl
            py-0.5
          "
        >
          {actions.map((action, i) => (
            <button
              key={i}
              disabled={action.disabled}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={async () => {
                setOpen(false);
                await action.onClick();
              }}
              className={`
                flex items-center gap-2
                w-full px-3 py-1.5
                text-xs text-left
                transition-colors
                disabled:opacity-40 disabled:cursor-not-allowed
                ${action.danger
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-[#cccccc] hover:bg-[#37373d]'}
              `}
            >
              <span className="flex-shrink-0 text-[#858585]">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}