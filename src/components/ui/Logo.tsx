import React, { useState, useEffect } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-12 w-12',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
  xl: 'h-32 w-32',
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
      return '/logo-falcao-coach.png';
    };
    
    setLogoPath(detectPath());
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const paths = [
      '/falcao-coach-landing/logo-falcao-coach.png',
      '/logo-falcao-coach.png',
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
      className={`${sizeClasses[size]} rounded-full object-cover shadow-lg border-2 border-white/20 ${className}`}
      onError={handleError}
    />
  );
};
