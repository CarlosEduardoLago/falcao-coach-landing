import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const gradientId = `logo-gradient-${size}`;
  
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Placeholder SVG - Falcão estilizado */}
        <circle cx="50" cy="50" r="45" fill={`url(#${gradientId})`} />
        <path
          d="M50 20 L60 40 L50 35 L40 40 Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="45" cy="50" r="3" fill="white" />
        <circle cx="55" cy="50" r="3" fill="white" />
        <path
          d="M45 60 Q50 65 55 60"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#F7931E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
