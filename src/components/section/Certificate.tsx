import React, { useState } from 'react';
import { certificates } from '@/interface/GlobalVar'
import CertificateCard from '../CertificateCard';

const Certificate: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="bg-gray-700 flex items-center justify-center p-20">
      <div className="flex flex-wrap gap-5 justify-center">
        {certificates.map((certificate, index) => (
          <CertificateCard
            key={index}
            src={certificate.src}
            alt={certificate.title}
            onHover={() => handleHover(index)}
            onLeave={handleLeave}
            isHovered={hoveredIndex === index || hoveredIndex === null}
          />
        ))}
      </div>
    </div>
  );
};

export default Certificate;