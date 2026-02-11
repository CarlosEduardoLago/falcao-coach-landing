import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { horarios } from '../../data/horarios';
import { Modalidade, NIVEL_LABELS } from '../../types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ServiceCardProps {
  modalidade: Modalidade;
  title: string;
  gradient: 'gradient-primary' | 'gradient-secondary';
  glowClass: string;
  icon: React.ReactNode;
  delay?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ modalidade, title, gradient, glowClass, icon, delay = '0ms' }) => {
  const anim = useScrollAnimation();
  const horariosModalidade = horarios.filter(h => h.modalidade === modalidade);
  const niveis = Array.from(new Set(horariosModalidade.map(h => h.nivel)));

  const formatarDias = (dias: string[]) => {
    const diasMap: Record<string, string> = {
      segunda: 'Seg',
      terca: 'Ter',
      quarta: 'Qua',
      quinta: 'Qui',
      sexta: 'Sex',
      sabado: 'Sáb',
    };
    return dias.map(d => diasMap[d] || d).join(', ');
  };

  return (
    <div ref={anim.ref}>
      <div
        className={`transition-all duration-700 ${
          anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: delay }}
      >
        <Card variant={gradient} className={`p-5 sm:p-6 md:p-8 text-white ${glowClass}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
              {icon}
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h3>
          </div>

          <div className="space-y-6">
            {niveis.map((nivel) => {
              const horariosNivel = horariosModalidade.filter(h => h.nivel === nivel);
              return (
                <div key={nivel} className="bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-colors">
                  <h4 className="text-lg sm:text-xl font-bold mb-3">{NIVEL_LABELS[nivel]}</h4>
                  <div className="space-y-2">
                    {horariosNivel.map((horario) => (
                      <div key={horario.id} className="text-white/90">
                        <span className="font-semibold">{formatarDias(horario.dias)}</span>
                        {' - '}
                        <span>{horario.horarios.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full"
            >
              Entrar em Contato
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const titleAnim = useScrollAnimation();

  return (
    <section id="servicos" className="py-16 md:py-24 bg-dark-gray">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnim.ref}>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-primary transition-all duration-700 ${
                titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Nossos Serviços
            </h2>
            <p
              className={`text-center text-gray-400 mb-10 sm:mb-12 text-base sm:text-lg transition-all duration-700 delay-200 ${
                titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Treinamentos especializados para todos os níveis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ServiceCard
              modalidade="praia"
              title="Vôlei de Praia"
              gradient="gradient-primary"
              glowClass="card-glow-primary"
              delay="0ms"
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <ServiceCard
              modalidade="indoor"
              title="Vôlei Indoor"
              gradient="gradient-secondary"
              glowClass="card-glow-secondary"
              delay="200ms"
              icon={
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};
