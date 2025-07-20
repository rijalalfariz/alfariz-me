import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const Ufo: React.FC = () => {
  const ufoRef = useRef(null);
  useEffect(() => {
    const ufo = ufoRef.current;
    if (!ufo) return;

    
    // const screenPadding = 50;
    // const ufoSize = 40; // px
    // const speed = 2;
    const avoidDistance = 150;
    
    const x = 100;
    const y = 100;
    // let vx = speed; // initial
    // let vy = speed; // initial

    // const updateUfoPosition = () => {
    //   const maxX = window.innerWidth - ufoSize - screenPadding;
    //   const maxY = document.body.scrollHeight - ufoSize - screenPadding;

    //   x += vx;
    //   y += vy;

    //   if (x < screenPadding || x > maxX) vx *= -1;
    //   if (y < screenPadding || y > maxY) vy *= -1;

    //   // Apply transform based on actual x and y, and adjust for scroll
    //   const scrollY = window.scrollY;
    //   (ufo as HTMLImageElement).style.transform = `translate(${x}px, ${y - scrollY}px)`;

    //   requestAnimationFrame(updateUfoPosition);
    // };

    const handleMouseMove = (e: MouseEvent) => {
      // Adjust mouseY to be relative to document, not just viewport
      const mouseX = e.clientX;
      const mouseY = e.clientY + window.scrollY;

      const dx = mouseX - x;
      const dy = mouseY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < avoidDistance) {
        // const angle = Math.atan2(dy, dx);
        // vx = -speed * Math.cos(angle);
        // vy = -speed * Math.sin(angle);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    // requestAnimationFrame(updateUfoPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 z-50 h-full w-[100dvw] min-w-[100dvh] bg-transparent pointer-events-none'>
      <div className='relative w-full h-full'>
        <Image
          ref={ufoRef}
          src="/space/ufo.svg"
          alt="ufo"
          width={50}
          height={50}
          className="w-[40px] h-auto drop-shadow-md"
        />
      </div>
    </div>
  );
};

export default Ufo;