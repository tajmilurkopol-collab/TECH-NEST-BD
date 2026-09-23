import React, { useState } from 'react';

interface ProductLogoProps {
  name: string;
  brand?: string;
  logoUrl?: string;
  accentColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

export const ProductLogo: React.FC<ProductLogoProps> = ({
  name,
  brand,
  logoUrl,
  accentColor = '#3B82F6',
  size = 'md',
  className = '',
  alt,
}) => {
  const [imageError, setImageError] = useState(false);

  // Compute clean 2-3 letter initials for fallback (never emoji!)
  const getInitials = () => {
    const sourceText = brand || name;
    const words = sourceText.trim().split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return sourceText.slice(0, 2).toUpperCase();
  };

  const sizeDimensions = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const handleImageError = () => {
    // Graceful error logging for missing/broken media in CMS audit
    console.debug(`[Media Fallback] Product logo failed to load for "${name}": ${logoUrl}`);
    setImageError(true);
  };

  const hasValidLogo = logoUrl && !imageError && logoUrl.trim().length > 0;

  return (
    <div
      className={`relative shrink-0 rounded-xl overflow-hidden flex items-center justify-center select-none transition-transform group-hover:scale-105 ${sizeDimensions[size]} ${className}`}
      style={{
        backgroundColor: '#0F172A',
        border: `1px solid ${accentColor}33`,
        boxShadow: `0 2px 10px -2px ${accentColor}25`,
      }}
      title={`${name} (${brand || 'Official Tool'})`}
    >
      {hasValidLogo ? (
        <img
          src={logoUrl}
          alt={alt || `${name} official logo`}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-contain p-1.5 transition-opacity duration-200"
        />
      ) : (
        // Neutral fallback container with clean brand initials (Anti-AI slop: no emojis!)
        <div
          className="w-full h-full flex items-center justify-center font-black tracking-wider uppercase"
          style={{
            color: '#F8FAFC',
            background: `linear-gradient(135deg, #1E293B 0%, #0F172A 100%)`,
          }}
        >
          <span style={{ color: accentColor }}>{getInitials()}</span>
        </div>
      )}
    </div>
  );
};
