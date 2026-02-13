import React, { useState, useEffect } from 'react';

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
  const [logoPath, setLogoPath] = useState<string>('/logo-falcao-coach.png');
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    // Detecta ambiente após componente montar
    const detectPath = () => {
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const pathname = window.location.pathname;
        
        // GitHub Pages
        if (hostname.includes('github.io') || pathname.includes('/falcao-coach-landing/')) {
          return '/falcao-coach-landing/logo-falcao-coach.png';
        }
      }
      
      // Desenvolvimento local
      const baseUrl = import.meta.env.BASE_URL || '/';
      return baseUrl + 'logo-falcao-coach.png';
    };
    
    setLogoPath(detectPath());
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const paths = [
      '/falcao-coach-landing/logo-falcao-coach.png',
      '/logo-falcao-coach.png',
      `${import.meta.env.BASE_URL || '/'}logo-falcao-coach.png`,
    ];
    
    if (errorCount < paths.length - 1) {
      const nextPath = paths[errorCount + 1];
      console.log(`Tentando caminho alternativo: ${nextPath}`);
      img.src = nextPath;
      setErrorCount(errorCount + 1);
    } else {
      console.error('Todos os caminhos falharam. Verifique se a imagem existe.');
    }
  };

  return (
    <img
      src={logoPath}
      alt="Falcão Coach Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
      style={{ maxHeight: '60px' }}
      onError={handleError}
    />
  );
};
