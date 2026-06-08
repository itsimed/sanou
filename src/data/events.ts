import type { Event } from '../types/event';

/**
 * Données d'exemple pour les événements
 * À remplacer par une requête API en production
 */
export const EVENTS_DATA: Event[] = [
  {
    id: '1',
    title: 'Concert Acoustique sous les étoiles',
    description:
      'Une soirée magique avec des artistes locaux jouant de la musique acoustique originale. Ambiance intimiste et conviviale.',
    date: '2026-06-15',
    time: '20:00',
    location: 'Parc Central, Jardin des Artistes',
    category: 'musique',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=300&fit=crop',
    capacity: 100,
    attendees: 87,
  },
  {
    id: '2',
    title: 'Exposition : Abstractions Colorées',
    description:
      'Découvrez les œuvres abstraites de 15 artistes contemporains. Vernissage avec cocktail le premier jour.',
    date: '2026-06-20',
    time: '18:00',
    location: 'Galerie Moderne Sanouva',
    category: 'peinture',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-6d2f1b0609fa?w=500&h=300&fit=crop',
    capacity: 50,
    attendees: 48,
  },
  {
    id: '3',
    title: 'Gala de Danse Contemporaine',
    description:
      'Spectacle de danse contemporaine mêlant traditions et modernité. Trois actes de pures émotions dansées.',
    date: '2026-06-25',
    time: '19:30',
    location: 'Théâtre de la Scène',
    category: 'danse',
    imageUrl: 'https://images.unsplash.com/photo-1518602924206-2b6dacb2b2d3?w=500&h=300&fit=crop',
    capacity: 120,
    attendees: 120,
  },
  {
    id: '4',
    title: 'Atelier Musique : Production Électronique',
    description:
      'Apprenez les bases de la production musicale électronique avec un producteur professionnel. Équipement fourni.',
    date: '2026-07-01',
    time: '14:00',
    location: 'Studio Sanouva Bien',
    category: 'musique',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=300&fit=crop',
    capacity: 25,
    attendees: 12,
  },
  {
    id: '5',
    title: 'Open Studio : Rencontres avec les Artistes',
    description:
      'Visitez les studios des artistes plasticiens et créez vos propres œuvres. Sessions libres toute la journée.',
    date: '2026-07-05',
    time: '10:00',
    location: 'District Artistique Sanouva',
    category: 'peinture',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=300&fit=crop',
    capacity: 200,
    attendees: 165,
  },
  {
    id: '6',
    title: 'Battle de Danse Hip-Hop',
    description:
      'Compétition amicale de danse hip-hop avec des crews locales. Ambiance énergique et divertissante garantie !',
    date: '2026-07-10',
    time: '20:00',
    location: 'Parc Central',
    category: 'danse',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    capacity: 300,
    attendees: 298,
  },
];
