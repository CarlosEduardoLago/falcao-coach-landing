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
  // Usa caminho relativo que funciona tanto em dev quanto no GitHub Pages
  // No Vite, arquivos em public/ são servidos na raiz
  const logoPath = import.meta.env.BASE_URL + 'logo-falcao-coach.png';
  
  return (
    <img
      src={logoPath}
      alt="Falcão Coach Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
      style={{ maxHeight: '60px' }}
      onError={(e) => {
        console.error('Erro ao carregar logo. Tentando caminho alternativo...');
        // Fallback: tenta caminho absoluto
        const img = e.currentTarget;
        if (!img.src.includes('/falcao-coach-landing/')) {
          img.src = '/falcao-coach-landing/logo-falcao-coach.png';
        } else {
          img.src = '/logo-falcao-coach.png';
        }
      }}
    />
  );
};
