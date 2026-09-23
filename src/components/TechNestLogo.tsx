import React from 'react';

interface TechNestLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const TechNestLogo: React.FC<TechNestLogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: {
      icon: 'w-8 h-8',
      title: 'text-sm sm:text-base',
      subtitle: 'text-[7.5px] sm:text-[8px] tracking-[0.22em]',
    },
    md: {
      icon: 'w-10 h-10 sm:w-11 sm:h-11',
      title: 'text-base sm:text-xl',
      subtitle: 'text-[8.5px] sm:text-[9.5px] tracking-[0.25em]',
    },
    lg: {
      icon: 'w-14 h-14',
      title: 'text-2xl sm:text-3xl',
      subtitle: 'text-[11px] sm:text-[12px] tracking-[0.28em]',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Exact Circular Woven Bird's Nest Icon with Two Sprouting Green Leaves */}
      <div className={`relative shrink-0 ${currentSize.icon} flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_0_8px_rgba(0,230,118,0.35)]"
        >
          {/* Top-Left Sprouting Leaf */}
          <g className="filter drop-shadow-[0_2px_4px_rgba(0,230,118,0.4)]">
            <path
              d="M32 30C28 22 20 14 10 14C8 22 14 32 24 35C27 36 30 33 32 30Z"
              fill="#00E676"
            />
            {/* Leaf center spine */}
            <path
              d="M10 14C17 21 23 27 28 32"
              stroke="#00A854"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Top-Right Sprouting Leaf */}
          <g className="filter drop-shadow-[0_2px_4px_rgba(0,230,118,0.4)]">
            <path
              d="M68 30C72 22 80 14 90 14C92 22 86 32 76 35C73 36 70 33 68 30Z"
              fill="#00E676"
            />
            {/* Leaf center spine */}
            <path
              d="M90 14C83 21 77 27 72 32"
              stroke="#00A854"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Circular Bird's Nest: Intricate Interwoven Twig Strands (Crisp White #FFFFFF) */}
          <g stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
            {/* Outer perimeter interwoven strands */}
            <path
              d="M50 18C68 18 84 32 85 52C86 70 72 86 52 86C32 86 16 72 16 52C16 35 30 20 48 18.5"
              strokeWidth="3.2"
            />
            <path
              d="M34 22C54 16 76 22 84 38C91 53 84 74 68 83C52 91 30 85 20 70C11 55 18 34 32 23"
              strokeWidth="2.5"
            />
            <path
              d="M66 22C80 32 87 50 82 68C77 82 59 89 42 86C26 82 14 67 17 48C20 32 36 21 54 20"
              strokeWidth="2.8"
            />

            {/* Mid-layer overlapping twigs */}
            <path
              d="M26 36C34 26 50 24 64 28C78 33 84 46 82 60C79 73 66 82 51 81C37 80 25 69 25 54C25 43 32 34 44 30"
              strokeWidth="2.6"
            />
            <path
              d="M72 38C80 48 78 64 68 74C58 82 42 82 31 73C21 64 22 47 31 37C41 27 58 27 70 36"
              strokeWidth="2.4"
            />
            <path
              d="M38 30C52 26 68 31 74 44C80 57 73 72 61 78C48 83 33 77 28 64C23 51 30 36 44 32"
              strokeWidth="2.2"
            />

            {/* Inner rim defining the hollow nest core */}
            <path
              d="M50 32C61 32 70 41 70 52C70 63 61 72 50 72C39 72 30 63 30 52C30 41 39 32 50 32Z"
              strokeWidth="2.8"
            />
            <path
              d="M42 34C55 31 66 38 68 49C70 60 62 70 50 71C38 71 31 61 33 49C35 40 42 34 52 33"
              strokeWidth="2"
            />
            <path
              d="M58 35C66 42 67 54 62 63C56 71 44 72 36 65C28 58 29 46 36 38C43 31 54 32 62 38"
              strokeWidth="1.8"
            />

            {/* Cross-locking twig accents giving realistic organic nest texture */}
            <path d="M22 42L36 34" strokeWidth="2.2" />
            <path d="M68 32L80 44" strokeWidth="2.2" />
            <path d="M78 62L65 74" strokeWidth="2.2" />
            <path d="M34 76L22 62" strokeWidth="2.2" />
            <path d="M28 50L35 58" strokeWidth="2" />
            <path d="M65 48L72 56" strokeWidth="2" />
            <path d="M42 70L54 73" strokeWidth="2" />
            <path d="M46 30L56 32" strokeWidth="2" />
          </g>

          {/* Central Nest Void */}
          <circle cx="50" cy="52" r="13" fill="#050B16" />
        </svg>
      </div>

      {/* Typography Exactly from Image: TECH [Green NEST] BD + DIGITAL TOOLS & AI MARKETPLACE */}
      <div className="flex flex-col justify-center">
        {/* Main Line: TECH NEST BD */}
        <div className={`font-black font-sans leading-none tracking-tight ${currentSize.title}`}>
          <span className="text-white">TECH </span>
          <span className="text-[#00E676]">NEST </span>
          <span className="text-white">BD</span>
        </div>

        {/* Subtitle Line: DIGITAL TOOLS & AI */}
        {showTagline && (
          <span
            className={`font-semibold font-sans uppercase text-slate-200 mt-1 leading-tight ${currentSize.subtitle}`}
          >
            DIGITAL TOOLS & AI
          </span>
        )}
      </div>
    </div>
  );
};
