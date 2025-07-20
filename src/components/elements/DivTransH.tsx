import React, { useRef, useEffect, useState } from "react";

interface DivTransHProps {
  open: boolean;
  children: React.ReactNode;
  duration?: number; // transition duration in ms
}

const DivTransH: React.FC<DivTransHProps> = ({
  open,
  children,
  duration = 300,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (ref.current) {
      if (open) {
        const scrollHeight = ref.current.scrollHeight;
        setHeight(`${scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [open, children]);

  return (
    <div
      ref={ref}
      style={{
        overflow: "hidden",
        maxHeight: height,
        transition: `all ${duration}ms ease`,
      }}
    >
      {children}
    </div>
  );
};

export default DivTransH;