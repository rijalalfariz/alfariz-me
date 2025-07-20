import React, { forwardRef, useEffect, useRef, HTMLAttributes } from 'react';

interface TiltDivProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TiltDiv = forwardRef<HTMLDivElement, TiltDivProps>(({ children, ...props }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const setRefs = (el: HTMLDivElement | null) => {
    cardRef.current = el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  useEffect(() => {
    if (!cardRef.current) return;

    const cardWrap = cardRef.current;
    const tiltBg = cardWrap.querySelectorAll(".TiltBG");
    const tiltMg = cardWrap.querySelectorAll(".TiltMG");
    const tiltFg = cardWrap.querySelectorAll(".TiltFG");

    let dimensions = { width: 0, height: 0 };
    let mousePosition = { x: 0, y: 0 };
    let isHovered = false;
    let mouseLeaveDelay: number | null = null;
    let animationFrame: number | null = null;

    let lastMouseX = 0;
    let lastMouseY = 0;

    // Calculate dimensions
    const updateDimensions = () => {
      dimensions = {
        width: cardWrap.offsetWidth,
        height: cardWrap.offsetHeight,
      };
    };

    // Update transforms
    const updateTransforms = () => {
      const mousePX = dimensions.width ? mousePosition.x / dimensions.width : 0;
      const mousePY = dimensions.height ? mousePosition.y / dimensions.height : 0;

      // Card tilt
      tiltMg.forEach(e => (e as HTMLElement).style.transform = `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`);

      // Background parallax
      tiltBg.forEach(e => (e as HTMLElement).style.transform = `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`);

      // Foreground parallax
      tiltFg.forEach(e => (e as HTMLElement).style.transform = `translateX(${mousePX * 20}px) translateY(${mousePY * 20}px)`);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = cardWrap.getBoundingClientRect();
      mousePosition = {
        x: e.clientX - rect.left - dimensions.width / 2,
        y: e.clientY - rect.top - dimensions.height / 2
      };

      // Use requestAnimationFrame for smooth performance
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateTransforms);
    };

    // Mouse enter handler
    const handleMouseEnter = () => {
      if (mouseLeaveDelay) {
        clearTimeout(mouseLeaveDelay);
        mouseLeaveDelay = null;
      }

      isHovered = true;
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      isHovered = false;

      // Reset position after delay
      mouseLeaveDelay = window.setTimeout(() => {
        mousePosition = { x: 0, y: 0 };
        updateTransforms();
      }, 1000);
    };

    // Initialize dimensions
    updateDimensions();

    const handleScroll = (e: Event) => {
      console.log('mxy', lastMouseX, lastMouseY);

      // Don't dispatch a fake event, just recalculate position
      if (!isHovered) return;

      const rect = cardWrap.getBoundingClientRect();
      mousePosition = {
        x: lastMouseX - rect.left - dimensions.width / 2,
        y: lastMouseY - rect.top - dimensions.height / 2
      };

      updateTransforms();
    }

    const trackGlobalMouse = (e: MouseEvent) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    window.addEventListener('mousemove', trackGlobalMouse);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousewheel', handleScroll);

    // Add event listeners
    cardWrap.addEventListener('mousemove', handleMouseMove);
    cardWrap.addEventListener('mouseenter', handleMouseEnter);
    cardWrap.addEventListener('mouseleave', handleMouseLeave);

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(cardWrap);

    // Cleanup
    return () => {
      cardWrap.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', trackGlobalMouse);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousewheel', handleScroll);
      cardWrap.removeEventListener('mouseenter', handleMouseEnter);
      cardWrap.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      if (mouseLeaveDelay) clearTimeout(mouseLeaveDelay);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [])

  return (
    <div ref={setRefs} {...props}>
      {children}
    </div>
  );
});

export default TiltDiv;