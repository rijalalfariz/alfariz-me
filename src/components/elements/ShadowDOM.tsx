import React, { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';

type ShadowDOMProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const ShadowDOM: React.FC<ShadowDOMProps> = ({ children, className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountPointRef = useRef<HTMLDivElement | null>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const reactRootRef = useRef<Root | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!container.shadowRoot) {
      shadowRootRef.current = container.attachShadow({ mode: 'open' });

      const mountPoint = document.createElement('div');
      shadowRootRef.current.appendChild(mountPoint);

      reactRootRef.current = createRoot(mountPoint);
    } else {
      shadowRootRef.current = container.shadowRoot;
    }

    // Render children
    reactRootRef.current?.render(<>{children}</>);

    return () => {
      // Clean up only on full unmount
      reactRootRef.current?.unmount();
      reactRootRef.current = null;
      shadowRootRef.current = null;
      mountPointRef.current = null;
    };
  }, [children]); // <- only run once

  useEffect(() => {
    // Re-render children only when they change
    reactRootRef.current?.render(<>{children}</>);
  }, [children]);

  return <div ref={containerRef} className={className} style={style} />;
};

export default ShadowDOM;
