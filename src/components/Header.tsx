import React, { useState, useEffect } from 'react';
import { Logo } from './ui/Logo';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const whatsappLink = 'https://wa.me/message/Z7GXF3B5IGIWD1';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="Ir para o topo"
          >
            <Logo size="sm" />
            <span className="text-xl font-bold text-white hidden sm:block">
              Falcão Coach
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-white hover:text-primary-start transition-colors font-medium"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-white hover:text-primary-start transition-colors font-medium"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('galeria')}
              className="text-white hover:text-primary-start transition-colors font-medium"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-white hover:text-primary-start transition-colors font-medium"
            >
              Contato
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 flex flex-col items-start">
            <button
              onClick={() => scrollToSection('sobre')}
              className="block w-full text-left text-white hover:text-primary-start transition-colors py-2"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('servicos')}
              className="block w-full text-left text-white hover:text-primary-start transition-colors py-2"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('galeria')}
              className="block w-full text-left text-white hover:text-primary-start transition-colors py-2"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="block w-full text-left text-white hover:text-primary-start transition-colors py-2"
            >
              Contato
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
