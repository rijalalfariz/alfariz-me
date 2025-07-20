"use client"
import React, { useEffect, useRef, useState } from 'react';
import { TechStackItem, TechStackConnection } from '@/interface/InterfaceList';
import { techStackConns } from '@/interface/GlobalVar';
import { IconName } from 'tech-stack-icons';
import TechStackBox from '../TechStackBox';
import TechStackLine from '../TechStackLine';
import useScrollFadeIn from '@/hooks/useScrollFadeIn';

const TechStack: React.FC = () => {
  const { ref, isVisible } = useScrollFadeIn<HTMLDivElement>();

  return (
    <div id="tech-stack" className="grid auto-rows-[min-content_1fr] overflow-y-visible overflow-x-clip mb-30">
      <div className="grid justify-center align-start text-center">
        <h2 className="text-2xl font-bold">Tech Stack</h2>
        <p>The technologies I use to bring ideas to life. Bricks of skill that represent the hall of proficiency.</p>
      </div>

      <div ref={ref} className={"h-[500px] relative m-5 transition-all duration-1000 ease-out delay-300 "+ (isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.5]')}>
        <h1 className="text-8xl text-(--bg-2) absolute left-[15%] top-[10%] font-bold">FRONTEND</h1>
        <h1 className="text-8xl text-(--bg-2) absolute left-[55%] top-[60%] font-bold">BACKEND</h1>
        {techStackConns.map((v, idx) => (
          <TechStackLine connection={v} key={idx} />
        ))}
        <TechStackBox techKey="js" className="left-[58%]" />
        <TechStackBox techKey="html" className="left-[35%] top-[2%]" />
        <TechStackBox techKey="ts" className="left-[76%] top-[10%]" />
        <TechStackBox techKey="css" className="left-[14%] top-[14%]" />
        <TechStackBox techKey="next" className="left-[44%] top-[18%]" />
        <TechStackBox techKey="bootstrap" className="left-[27%] top-[20%]" />
        <TechStackBox techKey="react" className="left-[59%] top-[35%]" />
        <TechStackBox techKey="node" className="left-[75%] top-[41%]" />
        <TechStackBox techKey="jquery" className="left-[45%] top-[43%]" />
        <TechStackBox techKey="tailwindcss" className="left-[18%] top-[45%]" />
        <TechStackBox techKey="git" className="left-[29%] top-[51%]" />
        <TechStackBox techKey="python" className="left-[55%] top-[55%]" />
        <TechStackBox techKey="php" className="left-[66%] top-[60%]" />
        <TechStackBox techKey="tensorflow" className="left-[40%] top-[62%]" />
        <TechStackBox techKey="silverstripe" className="left-[78%] top-[65%]" />
        <TechStackBox techKey="figma" className="left-[16%] top-[70%]" />
        <TechStackBox techKey="django" className="left-[52%] top-[76%]" />
        <TechStackBox techKey="mysql" className="left-[30%] top-[82%]" />
        <TechStackBox techKey="laravel" className="left-[65%] top-[85%]" />
        <TechStackBox techKey="posgresql" className="left-[40%] top-[90%]" />
      </div>
    </div>
  );
};

export default TechStack;