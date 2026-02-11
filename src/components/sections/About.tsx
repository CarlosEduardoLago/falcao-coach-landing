import React from 'react';
import { Card } from '../ui/Card';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const About: React.FC = () => {
  const titleAnim = useScrollAnimation();
  const imageAnim = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' });
  const contentAnim = useScrollAnimation({ rootMargin: '0px 0px -100px 0px' });
  const countersAnim = useScrollAnimation();

  return (
    <section id="sobre" className="py-16 md:py-24 bg-dark overflow-hidden">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnim.ref}>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 text-gradient-primary transition-all duration-700 ${
                titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Sobre o Falcão Coach
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Image */}
            <div ref={imageAnim.ref} className="order-2 md:order-1">
              <div
                className={`rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${
                  imageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
              >
                <div className="w-full h-72 sm:h-80 md:h-96 bg-gradient-to-br from-primary-start to-primary-end flex items-center justify-center">
                  <div className="text-center text-white p-6 sm:p-8">
                    <svg className="w-32 h-32 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <p className="text-xs sm:text-sm opacity-75">Foto do Falcão Coach</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div ref={contentAnim.ref} className="order-1 md:order-2 space-y-6">
              <p
                className={`text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed transition-all duration-700 ${
                  contentAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
              >
                Com vasta experiência no ensino de vôlei, o Falcão Coach dedica-se a desenvolver 
                atletas de todas as idades e níveis, desde crianças iniciantes até jogadores avançados. 
                Sua metodologia combina técnica, tática e preparação física para garantir o melhor 
                desempenho dos alunos.
              </p>

              <div className="grid gap-4">
                <div
                  className={`transition-all duration-700 delay-200 ${
                    contentAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                >
                  <Card variant="gradient-primary" className="p-5 sm:p-6 card-glow-primary">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          Treinador de Vôlei de Praia e Indoor
                        </h3>
                        <p className="text-white/90">
                          Nível III - CBV 🇧🇷
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div
                  className={`transition-all duration-700 delay-[400ms] ${
                    contentAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                >
                  <Card variant="gradient-secondary" className="p-5 sm:p-6 card-glow-secondary">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          Licenciatura em Educação Física
                        </h3>
                        <p className="text-white/90">
                          CREF 1705-G/MA
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Counters */}
          <div ref={countersAnim.ref} className="mt-12 sm:mt-16">
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 glass rounded-2xl p-3 sm:p-4 transition-all duration-700 ${
                countersAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <AnimatedCounter
                target={10}
                suffix="+"
                label="Anos de Experiência"
                icon={<svg className="w-7 h-7 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <AnimatedCounter
                target={500}
                suffix="+"
                label="Alunos Treinados"
                icon={<svg className="w-7 h-7 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              />
              <AnimatedCounter
                target={1000}
                suffix="+"
                label="Aulas Realizadas"
                icon={<svg className="w-7 h-7 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              />
              <AnimatedCounter
                target={2}
                label="Modalidades"
                icon={<svg className="w-7 h-7 text-primary-start" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
