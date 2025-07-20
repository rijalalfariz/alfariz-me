import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Project } from '@/interface/InterfaceList';
import DivTransH from './elements/DivTransH';
import TiltDiv from './elements/TiltDiv';

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isOtherHovered: boolean;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isHovered,
  onHover,
  onLeave,
  isOtherHovered,
  onClick,
}) => {
  const [preferedWidth, setPreferedWidth] = useState('auto');
  const [preferedHeight, setPreferedHeight] = useState('auto');
  const cardRef = useRef<HTMLDivElement>(null);
  const projectImageRef = useRef<HTMLImageElement>(null);
  const imageTransitionWidth = "100%";
  const [imageTransStyle, setImageTransStyle] = useState({});

  useEffect(() => {
    if (!cardRef.current) return;
    setPreferedWidth(`${cardRef.current.clientWidth}px`);
    setPreferedHeight(`${cardRef.current.scrollHeight}px`);
  }, [])

  const setInitImageRatio = () => {
    if (!projectImageRef.current) return;
    const img = projectImageRef.current;
    const orgRatio = img.naturalWidth / img.naturalHeight;
    const renderedRatio = 16 / 9;

    if (orgRatio<renderedRatio) {
      setImageTransStyle({
        width: `${100 * orgRatio / renderedRatio}%`
      })
    }
    if (orgRatio>renderedRatio) {
      setImageTransStyle({
        height: `${100 * renderedRatio / orgRatio}%`,
        transform: `translateY(${(100 - 100 * renderedRatio / orgRatio)/2}%)`
      })
    }
  }

  useEffect(() => {
    console.log('imageTransitionWidth', imageTransitionWidth)
  }, [imageTransitionWidth])

  const handleClick = () => {
    onClick(project)
  };

  const displayTech = (project.tech || []).slice(0, 5);
  const remainingTech = (project.tech || []).length > 5 ? project.tech.length - 5 : 0;

  return (
    <TiltDiv
      ref={cardRef}
      className={`ProjectCard relative min-w-[240px] overflow-visible transition-all duration-300 ease-out cursor-pointer ${isOtherHovered && !isHovered ? 'opacity-50' : 'opacity-100 z-10'
        }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}
      style={{
        width: preferedWidth,
        height: preferedHeight,
      }}
    >
      {/* Shadow as separate div */}
      <div
        className={`TiltMG TiltBG absolute inset-0 bg-black/10 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isHovered
          ? 'blur-xl translate-y-6 w-[120%] h-[180%]'
          : 'blur-md translate-y-2 w-full h-full'
          }`}
      />

      {/* Card Content */}
      <div
        className={`TiltMG absolute overflow-hidden bg-white rounded-2xl transition-all duration-300 overflow-visible ease-[cubic-bezier(0.23,1,0.32,1)] ${isHovered ? 'w-[120%] -left-[10%] -top-[10%]' : 'w-[100%] left-0 top-0'
          }`}
      >
        {/* Image Container with Ambient Effect */}
        <div className={`relative aspect-video transition-all duration-500 rounded-2xl ${isHovered ? "w-[150%] -left-[25%]" : "w-[100%] left-0"}`}>
          {/* Ambient Background */}
          <div
            className={`TiltBG absolute inset-0 transition-all aspect-video duration-500 ${isHovered ? 'scale-125 opacity-30' : 'scale-110 opacity-20'
              }`}
          >
            <Image
              src={project.image[0]}
              alt={`${project.title} ambient`}
              fill
              className="object-cover blur-3xl rounded-[inherit]"
            />
          </div>

          {/* Main Image */}
          <div
            className={`TiltFG absolute inset-0 aspect-video transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${isHovered ? "scale-110 p-5" : "scale-100 p-0"
              }`}
          >
            <Image
              ref={projectImageRef}
              src={project.image[0]}
              alt={project.title}
              width={320}
              height={180}
              className={`w-full h-full absolute inset-0 object-cover rounded-md transition-all duration-500`}
              priority
              style={isHovered ? imageTransStyle : {}}
              onLoad={setInitImageRatio}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 grid">
          <div className="grid gap-2">
            <h3 className="text-xl font-bold text-gray-900">
              {project.title}
            </h3>

            <p className={`text-gray-600 text-sm ${isHovered ? "" : "line-clamp-2"}`}>
              {project.description}
            </p>
          </div>

          {/* Tech Tags */}
          <DivTransH open={isHovered}>
            <div className={"flex flex-wrap gap-2 my-4 transition-all w-[120%] " + (isHovered ? "opacity-100" : "opacity-0")}>
              {displayTech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                >
                  {tech}
                </span>
              ))}
              {remainingTech > 0 && (
                <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  +{remainingTech}
                </span>
              )}
            </div>
          </DivTransH>
          {/* Click to see more text */}
          <div
            className={`text-right text-xs text-(--mg-5) -mb-3 -mr-3 transition-all duration-300 ${isHovered
              ? 'opacity-100 transform translate-y-0'
              : 'opacity-0 transform translate-y-2'
              }`}
          >
            click to see more
          </div>

        </div>
      </div>
    </TiltDiv>
  );
};

export default ProjectCard;