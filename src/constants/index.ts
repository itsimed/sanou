import type { NavLink, FooterSection, SocialLink } from '../types';

// Navigation links
export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Accueil', href: '/' },
  { id: 'events', label: 'Événements', href: '/events' },
  { id: 'gallery', label: 'Galerie', href: '/galerie' }, // <-- Corrigé ici : /galerie au lieu de /gallery
  { id: 'calendar', label: 'Calendrier', href: '/calendar' },
];

// Association information
export const ASSOCIATION_INFO = {
  name: 'Sanouva Bien',
  tagline: 'Petite scène, Grandes histoires.',
  fullName: 'Association Sanouva Bien',
  description:
    'Sanouva Bien est une association culturelle dédiée à la promotion des arts, de la musique et des performances. Nous créons des espaces pour les artistes émergents et établis pour partager leurs talents avec notre communauté vibrante.',
  mission:
    "Notre mission est de démocratiser l'accès aux arts et de créer une plateforme où la créativité peut s'épanouir sans limites.",
  vision:
    'Nous envisageons un monde où chaque voix peut être entendue, où chaque artiste peut briller, et où la culture unit les communautés.',
};

// Footer sections
export const FOOTER_SECTIONS: FooterSection[] = [
  
  {
    title: 'Navigation',
    links: [
      { label: 'Événements', href: '/events' },
      { label: 'Galerie', href: '/galerie' }, // <-- Corrigé ici également pour le Footer
      { label: 'Calendrier', href: '/calendar' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Email', href: 'mailto:sanouva.pas@gmail.com' },
      { label: 'Téléphone', href: 'tel:+33773890023' },
      { label: 'Localisation', href: 'https://maps.app.goo.gl/GM93c3rBvceUH3jG9' },
    ],
  },
];

// Social media links
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'instagram', url: 'https://www.instagram.com/sanou.vabien/', icon: 'instagram' },
];

// Contact information
export const CONTACT_INFO = {
  email: 'sanouva.pas@gmail.com',
  phone: '+33 7 73 89 00 23',
  address: 'Maison des associations, Paris 15e, France',
};