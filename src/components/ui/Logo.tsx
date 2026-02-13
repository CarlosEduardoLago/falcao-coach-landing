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
  // Constrói o caminho da imagem usando BASE_URL do Vite
  // BASE_URL já inclui a barra final: '/' ou '/falcao-coach-landing/'
  const getLogoPath = () => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    // Remove barra duplicada se houver e adiciona o nome do arquivo
    return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}logo-falcao-coach.png`;
  };
  
  return (
    <img
      src={getLogoPath()}
      alt="Falcão Coach"
      className={`${sizeClasses[size]} object-contain ${className}`}
      onError={(e) => {
        // Fallback se a imagem não carregar
        console.error('Erro ao carregar logo:', e.currentTarget.src);
      }}
    />
  );
};
