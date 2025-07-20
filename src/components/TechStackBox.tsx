"use client"
import React from 'react';
import { techStacks } from '@/interface/GlobalVar';
import StackIcon from 'tech-stack-icons';
import Image from 'next/image';
import ShadowDOM from './elements/ShadowDOM';

const TechStackBox: React.FC<{ techKey: string, className?: string }> = ({ techKey, className = "" }) => {
  const techStack = techStacks.find(v => v.key == techKey);
  if (!techStack) return;
  return (
    <div id={"TechStackBox_" + techKey} className={`bg-[var(--bg-1)] grid gap-1 justify-center align-start text-center rounded-sm p-2 shadow-md grid-rows-[1fr] align-content-between absolute ` + className} 
      style={{
        width: `${100*techStack.proficiency}px`,
        height: `${100*techStack.proficiency}px`
      }}
    >
      <div className="h-full flex items-center justify-center overflow-hidden">
        {techStack.icon ?
          <ShadowDOM className="h-full aspect-square">
            <StackIcon name={techStack.icon} className="h-full" />
          </ShadowDOM>
          :
          <Image src={`icons/${techKey}.svg`} alt={techKey} width={50} height={50} className="w-full h-full" />
        }
      </div>
      <p style={{
        fontSize: `${12*techStack.proficiency}px`
      }}>{techStack.name}</p>
    </div>
  );
};

export default TechStackBox;