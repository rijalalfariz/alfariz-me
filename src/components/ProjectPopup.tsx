import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Project } from '@/interface/InterfaceList'; // Adjust the import path as needed
import Image from 'next/image';

interface ProjectPopupProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = project.image.length > 1;

  // Auto-advance image slider
  useEffect(() => {
    if (!hasMultipleImages || !isOpen) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.image.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, project.image.length, isOpen]);

  const handleImageClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.image.length - 1 : prev - 1
    );
  }, [project.image.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % project.image.length);
  }, [project.image.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)]">
      <div className="relative max-w-6xl w-full max-h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden flex">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={["fas", "times"]} className="text-gray-600" />
        </button>

        <div className="flex flex-col lg:flex-row items-center w-full">

          {/* Left side - Image section */}
          <div className="relative lg:w-4/7 p-6 h-fit">
            <Image
              src={project.image[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="absolute -top-[10%] w-full h-full object-contain object-cover blur-3xl opacity-50"
              fill
            />
            {/* Main image with slider controls */}
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              <Image
                src={project.image[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                fill
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all cursor-pointer"
                  >
                    <FontAwesomeIcon icon={["fas", "chevron-left"]} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all cursor-pointer"
                  >
                    <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                  </button>
                </>
              )}
            </div>

            {/* Image thumbnails */}
            {hasMultipleImages && (
              <div className="flex gap-2 justify-center relative z-10">
                {project.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`w-20 h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${currentImageIndex === index
                      ? 'border-blue-500 scale-105'
                      : 'border-transparent hover:border-gray-300'
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      fill
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Content section */}
          <div className="lg:w-3/7 p-6 lg:p-8 pr-0! overflow-y-auto flex flex-col h-full">
            {/* Title and tagline */}
            <h2 className="text-2xl font-bold">{project.title}</h2>
            {project.tagLine && (
              <p className="text-md text-gray-600 mb-2">{project.tagLine}</p>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-(--bg-3) text-(--mg-6) rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col overflow-y-auto pr-8">

              {/* Long description */}
              <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                {project.longDescription || project.description}
              </p>

              {/* Features */}
              {project.feature && project.feature.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3 text-gray-800">KEY FEATURES</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.feature.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FontAwesomeIcon
                          icon={["fas", "check"]}
                          className="text-green-500 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-3 text-gray-800">TECHNOLOGIES USED</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-(--hl-2) text-(--hl-3) rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 justify-end">
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-(--hl-3) text-white rounded-full hover:bg-(--hl-2) transition-colors"
                  >
                    <FontAwesomeIcon icon={["fas", "external-link-alt"]} />
                    Open Site
                  </a>
                )}
                {project.gitLink && !project.isPrivate && (
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <FontAwesomeIcon icon={["fab", "github"]} />
                    View Code
                  </a>
                )}
                {project.isPrivate && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
                    <FontAwesomeIcon icon={["fas", "lock"]} />
                    Private Repository
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPopup;