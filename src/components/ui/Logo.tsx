import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 w-auto',
  md: 'h-16 w-auto',
  lg: 'h-24 w-auto',
  xl: 'h-32 w-auto',
};

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  // Usa BASE_URL do Vite para funcionar tanto em desenvolvimento quanto no GitHub Pages
  const logoPath = `${import.meta.env.BASE_URL}logo-falcao-coach.png`;
  
  return (
    <img
      src={logoPath}
      alt="Falcão Coach"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );
};
