'use client'
import React, { useEffect } from 'react';

const ScrollSlider = () => {
  useEffect(() => {
    const slider = document.getElementById('scroll-slider');
    const section = document.getElementById('slider-section');

    const onScroll = () => {
      if (!slider || !section) return;

      const scrollStart = section.offsetTop;
      const scrollEnd = scrollStart + section.offsetHeight - window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY >= scrollStart && scrollY <= scrollEnd) {
        const progress = scrollY - scrollStart;
        slider.style.transform = `translateX(-${progress}px)`;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="slider-section" className="relative h-[300vh] bg-gray-100">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-white">
        <div
          id="scroll-slider"
          className="flex transition-transform duration-300 ease-out"
          style={{ width: '300vw' }}
        >
          <div className="min-w-[100vw] h-screen bg-indigo-200 flex items-center justify-center text-4xl font-bold">
            Slide 1
          </div>
          <div className="min-w-[100vw] h-screen bg-green-200 flex items-center justify-center text-4xl font-bold">
            Slide 2
          </div>
          <div className="min-w-[100vw] h-screen bg-pink-200 flex items-center justify-center text-4xl font-bold">
            Slide 3
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollSlider;
