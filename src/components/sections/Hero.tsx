import React, { useEffect, useState } from 'react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: Math.random() * 40 + 20,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  duration: Math.random() * 4 + 3,
}));

export const Hero: React.FC = () => {
  const whatsappLink = 'https://wa.me/message/Z7GXF3B5IGIWD1';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-primary overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle bg-white animate-float"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Side - Content */}
          <div className="flex-1 text-center md:text-left">
            <div
              className={`flex justify-center md:justify-start mb-6 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Logo size="xl" />
            </div>
            
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Falcão Coach
            </h1>
            
            <p
              className={`text-xl md:text-2xl lg:text-3xl mb-6 text-white/90 font-medium transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Treinador de Vôlei de Praia e Indoor
            </p>
            
            <p
              className={`text-lg md:text-xl mb-8 text-white/80 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Nível III - CBV 🇧🇷
            </p>
            
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open(whatsappLink, '_blank')}
                className="btn-shimmer shadow-glow-secondary-lg"
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                }
              >
                Fale Conosco no WhatsApp
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div
            className={`flex-1 flex justify-center order-first md:order-last transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-float" style={{ animationDuration: '5s' }}>
                {/* Placeholder para foto do coach */}
                <div className="w-full h-full bg-gradient-to-br from-secondary-start to-secondary-end flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <p className="text-sm opacity-75">Foto do Falcão Coach</p>
                  </div>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          aria-label="Rolar para baixo"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Saiba Mais</span>
          <svg className="w-6 h-6 animate-scroll-down" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};
