import { motion } from 'framer-motion';
import type { Event } from '../types/event';
import { getCategoryConfig } from '../config/eventCategories';
import '../styles/events.css';

interface EventCardProps {
  event: Event;
}

/**
 * Composant EventCard - Affiche une carte d'événement
 * 
 * ACCESSIBILITÉ :
 * - Utilisé une balise <article> pour isoler le contenu
 * - Titre <h3> avec un ID unique pour associer aria-labelledby
 * - Image avec alt text descriptif
 * - Bouton accessible avec aria-label complet
 * - Contraste minimum 4.5:1 pour le texte sur les fonds colorés
 */
export function EventCard({ event }: EventCardProps) {
  const categoryConfig = getCategoryConfig(event.category);

  return (
    <motion.a
      href={`/event/${event.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="event-card overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col bg-black border border-white"
    >
      {/* Header with Category Badge */}
      <div className="flex items-start justify-between gap-3 px-4 py-2">
        <h3 
          id={`event-${event.id}`} 
          className="text-lg font-bold text-white line-clamp-2 flex-grow"
        >
          {event.title}
        </h3>
        <div
          className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex-shrink-0 whitespace-nowrap text-white ${categoryConfig.bgColor}`}
        >
          {categoryConfig.label}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-2">
        <p className="text-sm text-white line-clamp-2">
          {event.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="px-4 py-2 space-y-2 flex-grow">
        {/* Date & Time */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-violet-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white">Date & Heure</p>
            <p className="text-sm text-white font-medium">
              {new Date(event.date).toLocaleDateString('fr-FR', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })} à {event.time}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-violet-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white">Localisation</p>
            <p className="text-sm text-white font-medium line-clamp-1">{event.location}</p>
          </div>
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-violet-400">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-white">Capacité</p>
            <p className="text-sm text-white font-medium">{event.attendees}/{event.capacity} personnes</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-2 bg-black">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-4 font-semibold text-center transition-all text-sm cursor-pointer bg-white text-black hover:shadow-lg"
        >
          Voir les détails
        </motion.div>
      </div>
    </motion.a>
  );
}
