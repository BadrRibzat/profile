// components/Logo.tsx
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'simple';
  showRadiatingLines?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'full',
  showRadiatingLines = true
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const LogoSVG = variant === 'full' ? (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} ${className}`}
    >
      {/* Monogram BR */}
      <path 
        d="M23.0858 12C23.0858 10.8954 24 10 25.0909 10H32.0001H38.9092C39.9992 10 40.9143 10.8954 40.9143 12V22.5C40.9143 27.7467 36.8837 32 32.0001 32C27.1164 32 23.0858 27.7467 23.0858 22.5V12Z" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M23.0858 41C23.0858 35.2288 27.1164 30.5 32.0001 30.5C36.8837 30.5 40.9143 35.2288 40.9143 41V52C40.9143 53.1046 39.9992 54 38.9092 54H32.0001" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M23.0858 10V54" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M32 31L44.5 50" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Radiating Lines - only show if requested */}
      {showRadiatingLines && (
        <g opacity="0.7">
          <line x1="13" y1="13" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="13" y1="51" x2="21" y2="43" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="51" y1="13" x2="43" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="32" y1="5" x2="32" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="10" y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="54" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </g>
      )}
    </svg>
  ) : (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} ${className}`}
    >
      {/* Monogram BR - Simple version */}
      <path 
        d="M23.0858 12C23.0858 10.8954 24 10 25.0909 10H32.0001H38.9092C39.9992 10 40.9143 10.8954 40.9143 12V22.5C40.9143 27.7467 36.8837 32 32.0001 32C27.1164 32 23.0858 27.7467 23.0858 22.5V12Z" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M23.0858 41C23.0858 35.2288 27.1164 30.5 32.0001 30.5C36.8837 30.5 40.9143 35.2288 40.9143 41V52C40.9143 53.1046 39.9992 54 38.9092 54H32.0001" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M23.0858 10V54" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M32 31L44.5 50" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return LogoSVG;
};

export default Logo;
