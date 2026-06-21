import { useEffect, useRef } from 'react';

interface Props {
  state:     'none' | 'partial' | 'all';
  disabled?: boolean;
  onChange:  () => void;
}

/**
 * Checkbox that supports three visual states:
 *  - 'none'    → unchecked
 *  - 'partial' → indeterminate (–)
 *  - 'all'     → checked
 *
 * Click propagation is stopped internally so parent rows can also listen
 * to clicks without double-firing.
 */
export function TriStateCheckbox({ state, disabled, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.indeterminate = state === 'partial';
    ref.current.checked       = state === 'all';
  }, [state]);

  return (
    <input
      ref={ref}
      type="checkbox"
      disabled={disabled}
      /* Stop the native click from bubbling to parent row handlers */
      onClick={(e) => e.stopPropagation()}
      onChange={onChange}
      className="
        w-3.5 h-3.5 rounded-sm
        accent-blue-500
        cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-40
        flex-shrink-0
      "
    />
  );
}