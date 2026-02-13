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
  // Detecta automaticamente o caminho base baseado na URL atual
  const getLogoPath = () => {
    // Verifica se está no GitHub Pages
    if (typeof window !== 'undefined') {
      if (window.location.hostname.includes('github.io') || window.location.pathname.includes('/falcao-coach-landing/')) {
        return '/falcao-coach-landing/logo-falcao-coach.png';
      }
    }
    // Em desenvolvimento local ou usa BASE_URL do Vite
    const baseUrl = import.meta.env.BASE_URL || '/';
    return baseUrl + 'logo-falcao-coach.png';
  };
  
  return (
    <img
      src={getLogoPath()}
      alt="Falcão Coach Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
      style={{ maxHeight: '60px' }}
      onError={(e) => {
        console.error('Erro ao carregar logo:', e.currentTarget.src);
        // Fallback: tenta o outro caminho
        const img = e.currentTarget;
        if (img.src.includes('/falcao-coach-landing/')) {
          img.src = '/logo-falcao-coach.png';
        } else {
          img.src = '/falcao-coach-landing/logo-falcao-coach.png';
        }
      }}
    />
  );
};
