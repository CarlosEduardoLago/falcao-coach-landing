export type Modalidade = 'praia' | 'indoor';

export type Nivel = 'kids' | 'iniciantes' | 'intermediario' | 'avancado' | 'adulto';

export type DiaSemana = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado';

export interface Horario {
  id: string;
  modalidade: Modalidade;
  nivel: Nivel;
  dias: DiaSemana[];
  horarios: string[];
}

export const DIAS_SEMANA: Record<DiaSemana, string> = {
  segunda: 'Segunda',
  terca: 'Terça',
  quarta: 'Quarta',
  quinta: 'Quinta',
  sexta: 'Sexta',
  sabado: 'Sábado',
};

export const NIVEL_LABELS: Record<Nivel, string> = {
  kids: 'KIDS',
  iniciantes: 'INICIANTES',
  intermediario: 'INTERMEDIÁRIO',
  avancado: 'AVANÇADO',
  adulto: 'ADULTO',
};

export const MODALIDADE_LABELS: Record<Modalidade, string> = {
  praia: 'Vôlei de Praia',
  indoor: 'Vôlei Indoor',
};
