import React, { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { horarios } from '../../data/horarios';
import { Modalidade, Nivel, DiaSemana, DIAS_SEMANA, NIVEL_LABELS, MODALIDADE_LABELS } from '../../types';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const MODALIDADE_OPTIONS: { value: Modalidade | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todas' },
  { value: 'praia', label: 'Praia' },
  { value: 'indoor', label: 'Indoor' },
];

const NIVEL_OPTIONS: { value: Nivel | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'kids', label: 'Kids' },
  { value: 'iniciantes', label: 'Iniciantes' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
  { value: 'adulto', label: 'Adulto' },
];

const getDiaAtual = (): DiaSemana | null => {
  const dias: DiaSemana[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  const hoje = new Date().getDay();
  if (hoje === 0) return null; // domingo
  return dias[hoje - 1] || null;
};

export const Schedule: React.FC = () => {
  const [modalidadeFiltro, setModalidadeFiltro] = useState<Modalidade | 'todos'>('todos');
  const [nivelFiltro, setNivelFiltro] = useState<Nivel | 'todos'>('todos');
  const titleAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation();
  const diaAtual = getDiaAtual();

  const horariosFiltrados = useMemo(() => {
    return horarios.filter(h => {
      const matchModalidade = modalidadeFiltro === 'todos' || h.modalidade === modalidadeFiltro;
      const matchNivel = nivelFiltro === 'todos' || h.nivel === nivelFiltro;
      return matchModalidade && matchNivel;
    });
  }, [modalidadeFiltro, nivelFiltro]);

  const horariosPorDia = useMemo(() => {
    const dias: Record<string, typeof horariosFiltrados> = {
      segunda: [],
      terca: [],
      quarta: [],
      quinta: [],
      sexta: [],
      sabado: [],
    };

    horariosFiltrados.forEach(horario => {
      horario.dias.forEach(dia => {
        if (dias[dia]) {
          dias[dia].push(horario);
        }
      });
    });

    return dias;
  }, [horariosFiltrados]);

  const getCardColor = (modalidade: Modalidade) => {
    return modalidade === 'praia' 
      ? 'bg-gradient-primary' 
      : 'bg-gradient-secondary';
  };

  return (
    <section id="calendario" className="py-16 md:py-24 bg-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div ref={titleAnim.ref}>
            <h2
              className={`text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-primary transition-all duration-700 ${
                titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Calendário de Horários
            </h2>
            <p
              className={`text-center text-gray-400 mb-12 text-lg transition-all duration-700 delay-200 ${
                titleAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Encontre o horário ideal para você
            </p>
          </div>

          {/* Tab Filters */}
          <div className="flex flex-col gap-6 mb-12">
            {/* Modalidade Tabs */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Modalidade</label>
              <div className="flex gap-1 glass rounded-xl p-1">
                {MODALIDADE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setModalidadeFiltro(opt.value)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      modalidadeFiltro === opt.value
                        ? 'bg-gradient-primary text-white shadow-glow-primary'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nivel Tabs */}
            <div className="flex flex-col items-center gap-2">
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Nível</label>
              <div className="flex flex-wrap gap-1 glass rounded-xl p-1 justify-center">
                {NIVEL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setNivelFiltro(opt.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      nivelFiltro === opt.value
                        ? 'bg-gradient-secondary text-white shadow-glow-secondary'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid de Horários */}
          <div ref={gridAnim.ref}>
            {horariosFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  Nenhum horário encontrado com os filtros selecionados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(horariosPorDia).map(([dia, horariosDia], index) => {
                  if (horariosDia.length === 0) return null;
                  const isHoje = dia === diaAtual;

                  return (
                    <div
                      key={dia}
                      className={`transition-all duration-500 ${
                        gridAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Card
                        variant="default"
                        className={`p-6 ${isHoje ? 'ring-2 ring-primary-start shadow-glow-primary' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">
                            {DIAS_SEMANA[dia as keyof typeof DIAS_SEMANA]}
                          </h3>
                          <div className="flex items-center gap-2">
                            {isHoje && (
                              <span className="text-xs bg-gradient-primary text-white px-2 py-1 rounded-full font-semibold animate-pulse">
                                HOJE
                              </span>
                            )}
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                              {horariosDia.length} aula{horariosDia.length > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {horariosDia.map((horario) => (
                            <div
                              key={horario.id}
                              className={`${getCardColor(horario.modalidade)} rounded-lg p-4 text-white transition-transform duration-200 hover:scale-[1.02]`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-sm">
                                  {MODALIDADE_LABELS[horario.modalidade]}
                                </span>
                                <span className="text-xs bg-white/20 px-2 py-1 rounded">
                                  {NIVEL_LABELS[horario.nivel]}
                                </span>
                              </div>
                              <p className="text-lg font-bold">
                                {horario.horarios.join(', ')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
