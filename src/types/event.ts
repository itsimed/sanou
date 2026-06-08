/**
 * Type définissant la structure d'un événement
 * Utilisé pour typer strictement les événements dans l'application
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // Format: "2026-05-21"
  time: string; // Format: "19:30"
  location: string;
  category: 'musique' | 'peinture' | 'danse';
  imageUrl: string;
  capacity: number;
  attendees: number;
}

/**
 * Catégories d'événements avec leurs propriétés visuelles
 */
export type EventCategory = 'musique' | 'peinture' | 'danse' | 'tous';

export interface CategoryConfig {
  label: string;
  color: string; // Couleur Tailwind
  accentColor: string; // Couleur d'accent pour le texte/bordure
  bgColor: string; // Couleur de fond claire
}
