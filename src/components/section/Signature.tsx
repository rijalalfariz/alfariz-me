"use client"
import React, { useEffect, useRef, useState } from 'react';
import { TechStackItem, TechStackConnection, Project } from '@/interface/InterfaceList';
import { techStackConns } from '@/interface/GlobalVar';
import { IconName } from 'tech-stack-icons';
import TechStackBox from '../TechStackBox';
import TechStackLine from '../TechStackLine';
import useScrollFadeIn from '@/hooks/useScrollFadeIn';
import { projects } from '@/interface/GlobalVar';
import ProjectCard from '../ProjectCard';
import ProjectPopup from '../ProjectPopup';

const Signature: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProject(null);
  };

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <div id="signature" className="grid auto-rows-[min-content_1fr] w-[80vw] mx-auto">
        <div className="grid justify-center align-start text-center">
          <h2 className="text-2xl font-bold">Signature</h2>
          <p>A showcase of the hard work and meaningful projects I've built to create impact for users and clients alike.</p>
        </div>

        <div className="container mx-auto px-12 py-12">
          <div className="flex flex-wrap justify-center gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                isHovered={hoveredIndex === index}
                onHover={() => handleHover(index)}
                onLeave={handleLeave}
                isOtherHovered={hoveredIndex !== null}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedProject && (
        <ProjectPopup
          project={selectedProject}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}

export default Signature;