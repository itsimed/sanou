import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EventCard } from '../components/EventCard';
import { Header } from '../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';
import type { Event, EventCategory } from '../types/event';
import { CATEGORY_CONFIGS } from '../config/eventCategories';
import { EVENTS_DATA } from '../data/events';
import { getAllEvents, type ApiEvent } from '../lib/api';
import { fonts } from '../config/fonts';
import '../styles/events.css';

/**
 * Page Événements - Affiche une liste filtrable d'événements
 * 
 * ACCESSIBILITÉ :
 * - Utilise des boutons radio fonctionnels avec aria-pressed
 * - Chaque bouton de filtre gère le focus correctement
 * - Les changements de filtre notifient les lecteurs d'écran via aria-live
 * - La grille d'événements utilise des rôles sémantiques <article>
 * - Tous les éléments interactifs sont accessibles au clavier
 */
export function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventCategory | 'tous'>('tous');
  const [events, setEvents] = useState<Event[]>(EVENTS_DATA);

  // Charger les événements du backend au mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const backendEvents = await getAllEvents();
      // Convertir les événements du backend au format frontend
      const convertedEvents: Event[] = backendEvents.map((event: ApiEvent) => ({
        id: event.id,
        title: event.title,
        category: event.category,
        description: event.description || '',
        imageUrl: event.imageUrl || '',
        date: event.date,
        time: event.time || '',
        location: event.location || '',
        capacity: event.capacity || 30,
        attendees: event.attendees || 0,
        type: event.type,
      }));
      setEvents(convertedEvents);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      // Garder les événements locaux en cas d'erreur
    }
  };

  // Filtrer les événements en fonction de la catégorie active
  const filteredEvents: Event[] =
    activeFilter === 'tous'
      ? events
      : events.filter((event) => event.category === activeFilter);

  // Compter le nombre d'événements par catégorie
  const countByCategory = {
    tous: events.length,
    musique: events.filter((e) => e.category === 'musique').length,
    peinture: events.filter((e) => e.category === 'peinture').length,
    danse: events.filter((e) => e.category === 'danse').length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="w-full bg-black text-white">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Hero Section */}
      <section className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black border-b border-white/20">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white"
              style={{ fontFamily: fonts.heading }}
            >
              Nos Événements
            </h1>
            <p
              className="text-lg sm:text-xl text-white max-w-3xl"
              style={{ fontFamily: fonts.body }}
            >
              Découvrez notre calendrier d'événements culturels : concerts, expositions, et spectacles de danse.
              Explorez les talents de notre communauté !
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="w-full max-w-7xl mx-auto">
          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2
              className="text-lg sm:text-xl font-semibold mb-6 text-white"
              style={{ fontFamily: fonts.heading }}
            >
              Filtrer par catégorie
            </h2>

            {/* Filter Buttons - Role group pour l'accessibilité */}
            <div
              role="group"
              aria-label="Filtrage par catégorie d'événement"
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              {/* Button "Tous" */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter('tous')}
                // ACCESSIBILITÉ: aria-pressed pour indiquer l'état du bouton
                aria-pressed={activeFilter === 'tous'}
                className={`filter-button px-6 py-3 font-semibold transition-all text-sm sm:text-base ${
                  activeFilter === 'tous'
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-black text-white hover:bg-gray-900 border border-white'
                }`}
              >
                Tous ({countByCategory.tous})
              </motion.button>

              {/* Category Buttons */}
              {['musique', 'peinture', 'danse'].map((category) => {
                const config = CATEGORY_CONFIGS[category];
                const count = countByCategory[category as keyof typeof countByCategory];

                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(category as EventCategory)}
                    // ACCESSIBILITÉ: aria-pressed et aria-label pour clarté
                    aria-pressed={activeFilter === category}
                    aria-label={`Filtrer par ${config.label} (${count} événements)`}
                    className={`filter-button px-6 py-3 font-semibold transition-all text-sm sm:text-base ${
                      activeFilter === category
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-black text-white hover:bg-gray-900 border border-white'
                    }`}
                  >
                    {config.label} ({count})
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Results Counter - ACCESSIBILITÉ: aria-live pour notifier les changements */}
          <motion.div
            key={activeFilter} // Force la re-animation lors du changement de filtre
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
            aria-atomic="true"
            className="mb-8 text-white text-sm"
          >
            {filteredEvents.length === 0 ? (
              <p>Aucun événement trouvé pour cette catégorie.</p>
            ) : (
              <p>{filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''} à découvrir</p>
            )}
          </motion.div>

          {/* Events Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start"
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center py-16"
            >
              <svg
                className="w-16 h-16 mx-auto mb-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-white text-lg">Aucun événement disponible pour le moment.</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
