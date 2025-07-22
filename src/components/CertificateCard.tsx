import Image from 'next/image';
import React from 'react';

interface CertificateCardProps {
  src: string;
  alt?: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  src,
  alt = 'Glowing content',
  onHover,
  onLeave,
  isHovered,
}) => {

  return (
    <div className={`group relative inline-block hover:scale-105 transition-all ${isHovered ? "opacity-100" : "opacity-50"}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Glow effects container */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
      >
        {/* Top glow */}
        <div
          className="absolute -left-[10%] -top-[43%] w-[120%] rotate-180 aspect-5/2"
        >
          <Image
            className=""
            src={'/img/glow.png'}
            fill
            alt='glow'
          />
        </div>

        {/* Bottom glow */}
        <div
          className="absolute -left-[10%] -bottom-[43%] w-[120%] aspect-5/2"
        >
          <Image
            className=""
            src={'/img/glow.png'}
            fill
            alt='glow'
          />
        </div>


        {/* Left glow */}
        <div
          className="absolute -top-[30%] -left-[32%] h-[160%] rotate-180 aspect-2/5"
        >
          <Image
            className=""
            src={'/img/glowV.png'}
            fill
            alt='glow'
          />
        </div>


        {/* Right glow */}
        <div
          className="absolute -top-[30%] -right-[32%] h-[160%] aspect-2/5"
        >
          <Image
            className=""
            src={'/img/glowV.png'}
            fill
            alt='glow'
          />
        </div>

      </div>

      {/* Main content */}
      <div
        className="relative"
      >
        <Image
          src={src}
          alt={alt}
          width={240}
          height={160}
          className={`border-2 border-gray-800`}
          style={{
            objectFit: 'cover',
            background: 'white'
          }}
        />
      </div>
    </div>
  );
};

export default CertificateCard;