import { TechStackConnection } from "@/interface/InterfaceList";
import React, { useState, useEffect } from "react";

const TechStackLine: React.FC<{ connection: TechStackConnection }> = ({ connection }) => {
  const [lineProps, setLineProps] = useState({
    topPercent: 0,
    leftPercent: 0,
    widthPercent: 0,
    angle: 0,
  });

  useEffect(() => {
    function getCenterRelativeToParent(el: HTMLElement | null, parent: HTMLElement | null) {
      if (!el || !parent) return { x: 0, y: 0 };
      const elRect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      return {
        x: elRect.left - parentRect.left + elRect.width / 2,
        y: elRect.top - parentRect.top + elRect.height / 2,
      };
    }

    function updateLine() {
      const div1 = document.getElementById(`TechStackBox_${connection.from}`);
      const div2 = document.getElementById(`TechStackBox_${connection.to}`);
      const parent = div1?.offsetParent as HTMLElement | null;

      if (div1 && div2 && parent) {
        const c1 = getCenterRelativeToParent(div1, parent);
        const c2 = getCenterRelativeToParent(div2, parent);

        const dx = c2.x - c1.x;
        const dy = c2.y - c1.y;
        const width = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const parentRect = parent.getBoundingClientRect();
        const topPercent = (c1.y / parentRect.height) * 100;
        const leftPercent = (c1.x / parentRect.width) * 100;
        const widthPercent = (width / parentRect.width) * 100;

        setLineProps({
          topPercent,
          leftPercent,
          widthPercent,
          angle,
        });
      }
    }

    updateLine();
    window.addEventListener("resize", updateLine);
    return () => window.removeEventListener("resize", updateLine);
  }, [connection]);

  return (
    <div
      className="absolute h-px bg-[var(--mg-4)]"
      style={{
        top: `${lineProps.topPercent}%`,
        left: `${lineProps.leftPercent}%`,
        width: `${lineProps.widthPercent}%`,
        transform: `rotate(${lineProps.angle}deg)`,
        transformOrigin: '0 0',
      }}
    ></div>
  );
}

export default TechStackLine;