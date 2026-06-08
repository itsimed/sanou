import type { CalendarEvent } from '../types/calendar';

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-001',
    date: new Date('2026-05-23'),
    title: 'Atelier Guitare - Initiation',
    category: 'musique',
    type: 'atelier',
    time: '10:00',
    location: 'Salle Musique A',
    description: 'Découvrez les bases de la guitare acoustique',
  },
  {
    id: 'evt-002',
    date: new Date('2026-05-24'),
    title: 'Spectacle Jazz en direct',
    category: 'musique',
    type: 'spectacle',
    time: '20:00',
    location: 'Grand Auditorium',
    description: 'Soirée jazz avec musiciens confirmés',
  },
  {
    id: 'evt-003',
    date: new Date('2026-05-25'),
    title: 'Atelier Peinture Aquarelle',
    category: 'peinture',
    type: 'atelier',
    time: '14:00',
    location: 'Atelier Couleurs',
    description: 'Techniques aquarelle pour débutants',
  },
  {
    id: 'evt-004',
    date: new Date('2026-05-26'),
    title: 'Exposition Peinture - Vernissage',
    category: 'peinture',
    type: 'spectacle',
    time: '18:00',
    location: 'Galerie Sanouva',
  },
  {
    id: 'evt-005',
    date: new Date('2026-05-27'),
    title: 'Danse Contemporaine - Répétition',
    category: 'danse',
    type: 'atelier',
    time: '16:00',
    location: 'Studio Danse',
  },
  {
    id: 'evt-006',
    date: new Date('2026-05-28'),
    title: 'Gala de Danse - Spectacle',
    category: 'danse',
    type: 'spectacle',
    time: '20:30',
    location: 'Grand Auditorium',
  },
];

export const DAYS_OF_WEEK = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export const MONTHS_LABELS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export const CATEGORY_COLORS = {
  musique: {
    label: 'Musique',
    colorBorder: 'border-violet-500',
    colorBg: 'bg-violet-500/10',
    colorDot: 'bg-violet-500',
  },
  peinture: {
    label: 'Peinture',
    colorBorder: 'border-yellow-400',
    colorBg: 'bg-yellow-400/10',
    colorDot: 'bg-yellow-400',
  },
  danse: {
    label: 'Danse',
    colorBorder: 'border-cyan-400',
    colorBg: 'bg-cyan-400/10',
    colorDot: 'bg-cyan-400',
  },
};
