import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const Contact: React.FC = () => {
  const whatsappLink = 'https://wa.me/message/Z7GXF3B5IGIWD1';
  const instagramWebLink = 'https://www.instagram.com/falcaocoach?igsh=ZWJ3eHR2ajIwODN3';
  const instagramUsername = 'falcaocoach';
  const titleAnim = useScrollAnimation();
  const cardsAnim = useScrollAnimation();

  const handleInstagramClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Detecta se é mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isMobile) {
      e.preventDefault();
      
      let appLink = '';
      
      if (isIOS) {
        // iOS: usa o esquema instagram://
        appLink = `instagram://user?username=${instagramUsername}`;
      } else if (isAndroid) {
        // Android: usa intent:// que funciona melhor
        appLink = `intent://www.instagram.com/${instagramUsername}#Intent;package=com.instagram.android;scheme=https;end`;
      }

      // Tenta abrir o app primeiro
      if (appLink) {
        const startTime = Date.now();
        let appOpened = false;

        // Listener para detectar se o app foi aberto (página fica oculta)
        const handleVisibilityChange = () => {
          if (document.hidden) {
            appOpened = true;
            cleanup();
          }
        };

        const handleBlur = () => {
          appOpened = true;
          cleanup();
        };

        const cleanup = () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          window.removeEventListener('blur', handleBlur);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);

        // Tenta abrir o app
        window.location.href = appLink;

        // Fallback: se após 500ms o app não abriu, redireciona para web
        setTimeout(() => {
          if (!appOpened && Date.now() - startTime < 1000) {
            cleanup();
            window.location.href = instagramWebLink;
          }
        }, 500);
      } else {
        // Se não conseguiu determinar o OS, usa link web direto
        window.location.href = instagramWebLink;
      }
    }
    // Se não for mobile, deixa o comportamento padrão do link funcionar
  };

  return (
    <section id="contato" className="py-16 md:py-24 bg-dark">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div ref={titleAnim.ref}>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-primary transition-all duration-700 ${
                titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Entre em Contato
            </h2>
            <p
              className={`text-center text-gray-400 mb-10 sm:mb-12 text-base sm:text-lg transition-all duration-700 delay-200 ${
                titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Estamos prontos para ajudar você a alcançar seus objetivos
            </p>
          </div>

          <div ref={cardsAnim.ref} className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {/* WhatsApp Principal */}
            <div
              className={`transition-all duration-700 ${
                cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <Card variant="gradient-primary" className="p-6 sm:p-8 text-white text-center card-glow-primary animated-gradient" style={{ backgroundImage: 'linear-gradient(135deg, #FF6B35, #F7931E, #FF8C42, #FF6B35)', backgroundSize: '200% 200%' }}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">WhatsApp</h3>
                <p className="text-white/80 mb-6">Fale conosco diretamente</p>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => window.open(whatsappLink, '_blank')}
                  className="w-full"
                >
                  Abrir Conversa
                </Button>
              </Card>
            </div>

            {/* Instagram */}
            <div
              className={`transition-all duration-700 delay-200 ${
                cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <Card variant="gradient-secondary" className="p-6 sm:p-8 text-white text-center card-glow-secondary animated-gradient" style={{ backgroundImage: 'linear-gradient(135deg, #4A90E2, #7B68EE, #6A8FE2, #4A90E2)', backgroundSize: '200% 200%' }}>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Instagram</h3>
                <p className="text-white/80 mb-2">@falcaocoach</p>
                <a
                  href={instagramWebLink}
                  onClick={handleInstagramClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 text-base border-2 border-white text-white hover:bg-white hover:text-dark rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Seguir no Instagram
                </a>
              </Card>
            </div>
          </div>

          {/* Localização com mapa placeholder */}
          <div
            className={`transition-all duration-700 delay-300 ${
              cardsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Card variant="default" className="p-0 overflow-hidden">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-dark-gray to-dark flex items-center justify-center">
                {/* Mapa estilizado placeholder */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF6B35' fill-opacity='0.3'%3E%3Cpath d='M0 20h40v1H0zM20 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>
                <div className="relative text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce-subtle">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">Localização</h4>
                  <p className="text-gray-400">Florianópolis - SC</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
