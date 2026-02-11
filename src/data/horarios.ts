import { Horario } from '../types';

export const horarios: Horario[] = [
  // VÔLEI DE PRAIA - KIDS
  {
    id: 'praia-kids-1',
    modalidade: 'praia',
    nivel: 'kids',
    dias: ['segunda', 'terca', 'quarta', 'quinta'],
    horarios: ['18h', '19h'],
  },
  
  // VÔLEI DE PRAIA - INICIANTES
  {
    id: 'praia-iniciantes-1',
    modalidade: 'praia',
    nivel: 'iniciantes',
    dias: ['terca', 'quinta', 'sexta'],
    horarios: ['8h'],
  },
  {
    id: 'praia-iniciantes-2',
    modalidade: 'praia',
    nivel: 'iniciantes',
    dias: ['segunda', 'terca', 'quarta', 'quinta', 'sexta'],
    horarios: ['8h'],
  },
  {
    id: 'praia-iniciantes-3',
    modalidade: 'praia',
    nivel: 'iniciantes',
    dias: ['segunda', 'terca', 'quarta', 'quinta'],
    horarios: ['19h', '20h'],
  },
  
  // VÔLEI DE PRAIA - INTERMEDIÁRIO
  {
    id: 'praia-intermediario-1',
    modalidade: 'praia',
    nivel: 'intermediario',
    dias: ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'],
    horarios: ['7h'],
  },
  {
    id: 'praia-intermediario-2',
    modalidade: 'praia',
    nivel: 'intermediario',
    dias: ['segunda', 'terca', 'quarta', 'quinta'],
    horarios: ['19h', '20h'],
  },
  
  // VÔLEI DE PRAIA - AVANÇADO
  {
    id: 'praia-avancado-1',
    modalidade: 'praia',
    nivel: 'avancado',
    dias: ['segunda', 'terca', 'quarta', 'quinta'],
    horarios: ['16:30'],
  },
  {
    id: 'praia-avancado-2',
    modalidade: 'praia',
    nivel: 'avancado',
    dias: ['segunda', 'terca', 'quarta', 'quinta'],
    horarios: ['23h'],
  },
  
  // VÔLEI INDOOR - KIDS
  {
    id: 'indoor-kids-1',
    modalidade: 'indoor',
    nivel: 'kids',
    dias: ['segunda', 'quarta', 'sexta'],
    horarios: ['10h'],
  },
  {
    id: 'indoor-kids-2',
    modalidade: 'indoor',
    nivel: 'kids',
    dias: ['segunda', 'quarta', 'sexta'],
    horarios: ['17h', '18h', '19h'],
  },
  {
    id: 'indoor-kids-3',
    modalidade: 'indoor',
    nivel: 'kids',
    dias: ['terca', 'quinta'],
    horarios: ['17h', '18h'],
  },
  
  // VÔLEI INDOOR - INICIANTES
  {
    id: 'indoor-iniciantes-1',
    modalidade: 'indoor',
    nivel: 'iniciantes',
    dias: ['segunda', 'quarta', 'sexta'],
    horarios: ['17h', '18h', '19h'],
  },
  {
    id: 'indoor-iniciantes-2',
    modalidade: 'indoor',
    nivel: 'iniciantes',
    dias: ['terca', 'quinta'],
    horarios: ['17h', '18h'],
  },
  
  // VÔLEI INDOOR - ADULTO
  {
    id: 'indoor-adulto-1',
    modalidade: 'indoor',
    nivel: 'adulto',
    dias: ['segunda', 'quarta', 'sexta'],
    horarios: ['18h', '20h'],
  },
  
  // VÔLEI INDOOR - INTERMEDIÁRIO
  {
    id: 'indoor-intermediario-1',
    modalidade: 'indoor',
    nivel: 'intermediario',
    dias: ['segunda', 'quarta', 'sexta'],
    horarios: ['20h'],
  },
];
