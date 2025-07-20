import { useEffect, useRef, useState } from 'react';

export default function useScrollFadeIn<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // observer.unobserve(entry.target); // Remove if you want it to only animate once
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return { ref, isVisible };
}
