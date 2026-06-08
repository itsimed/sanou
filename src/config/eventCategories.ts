import type { EventCategory, CategoryConfig } from '../types/event';

/**
 * Configuration des catégories d'événements
 * Associe chaque catégorie à une couleur et des propriétés visuelles
 * 
 * ACCESSIBILITÉ :
 * - Les couleurs sont assorties pour respecter un contraste minimum de 4.5:1
 * - Pas de distinction uniquement par couleur (utilisation de labels textuels)
 */
export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  musique: {
    label: 'Musique',
    color: 'violet',
    accentColor: 'text-violet-400',
    bgColor: 'bg-violet-900/50',
  },
  peinture: {
    label: 'Peinture',
    color: 'rose',
    accentColor: 'text-pink-400',
    bgColor: 'bg-pink-900/50',
  },
  danse: {
    label: 'Danse',
    color: 'cyan',
    accentColor: 'text-cyan-400',
    bgColor: 'bg-cyan-900/50',
  },
};

export function getCategoryConfig(category: string): CategoryConfig {
  return CATEGORY_CONFIGS[category] || CATEGORY_CONFIGS.musique;
}

export const ALL_CATEGORIES: EventCategory[] = ['musique', 'peinture', 'danse'];
