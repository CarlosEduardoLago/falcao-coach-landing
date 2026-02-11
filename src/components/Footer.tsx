import React from 'react';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-gray py-8 border-t border-gray-800">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <Logo size="sm" />
            <div className="min-w-0">
              <p className="text-white font-semibold">Falcão Coach</p>
              <p className="text-gray-400 text-sm break-words">
                Treinador de Vôlei de Praia e Indoor Nível III - CBV
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {currentYear} Falcão Coach. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Licenciatura em Educação Física - CREF 1705-G/MA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
