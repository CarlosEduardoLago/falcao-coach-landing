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
  // BASE_URL do Vite já inclui a barra final quando configurado
  // Em dev: '/' | No GitHub Pages: '/falcao-coach-landing/'
  const baseUrl = import.meta.env.BASE_URL;
  const logoPath = baseUrl + 'logo-falcao-coach.png';
  
  return (
    <img
      src={logoPath}
      alt="Falcão Coach"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );
};
