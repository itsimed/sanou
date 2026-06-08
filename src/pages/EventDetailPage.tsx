import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';
import { CATEGORY_COLORS } from '../data/calendarEvents';
import { CALENDAR_EVENTS } from '../data/calendarEvents';
import { EVENTS_DATA } from '../data/events';
import type { Event } from '../types/event';
import type { CalendarEvent } from '../types/calendar';
import { getEventById, type ApiEvent } from '../lib/api';

export function EventDetailPage({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<ApiEvent | Event | CalendarEvent | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger l'événement du backend
  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const loadEvent = async () => {
    setLoading(true);
    try {
      // Essayer de récupérer du backend
      const backendEvent = await getEventById(eventId);
      setEvent(backendEvent);
    } catch (err) {
      console.error('Événement non trouvé sur le backend, tentative de recherche locale:', err);
      // Fallback sur les événements locaux
      const calendarEvent = CALENDAR_EVENTS.find((e) => e.id === eventId);
      const eventsPageEvent = EVENTS_DATA.find((e) => e.id === eventId);
      const localEvent = eventsPageEvent || calendarEvent;
      if (localEvent) {
        setEvent(localEvent);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-white">Chargement...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <Breadcrumb />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Événement non trouvé</p>
            <a href="/" className="text-white hover:text-gray-300">Retour à l'accueil</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Déterminer le type d'événement et ses propriétés
  const eventDate = new Date(event.date);
  const dayOfWeek = eventDate.toLocaleDateString('fr-FR', { weekday: 'long' });
  const dateStr = eventDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedDate = `${dayOfWeek} ${dateStr}`;
  const categoryLabel = event.category.charAt(0).toUpperCase() + event.category.slice(1);
  const categoryConfig = CATEGORY_COLORS[event.category];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <Breadcrumb />

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Retour */}
          <a href="/events" className="inline-flex items-center gap-2 text-white hover:text-gray-300 mb-8 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Retour aux événements
          </a>

          {/* En-tête */}
          <div className="mb-8">
            {categoryConfig && (
              <div className={`inline-block px-4 py-2 ${categoryConfig.colorBg} text-white mb-4`}>
                <span className="text-sm font-semibold">{categoryLabel}</span>
              </div>
            )}
            <h1 className="text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex items-center gap-4 text-white flex-wrap">
              <span>{formattedDate}</span>
              {event.time && <span>{event.time}</span>}

            </div>
          </div>

          {/* Contenu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Détails principaux */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              {event.description && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">À propos</h2>
                  <p className="text-white text-lg leading-relaxed">{event.description}</p>
                </section>
              )}

              {/* Type d'événement */}
              {'type' in event && (
                <section>
                  <h3 className="text-lg font-semibold mb-2">Type d'événement</h3>
                  <p className="text-white capitalize">
                    {event.type === 'atelier' ? 'Atelier' : 'Spectacle'}
                  </p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Infos pratiques */}
              <div className="bg-black border border-white p-6">
                <h2 className="text-xl font-bold mb-6">Infos pratiques</h2>

                {/* Date */}
                <div className="mb-6 pb-6 border-b border-gray-800">
                  <p className="text-white text-sm mb-2">Date</p>
                  <p className="font-semibold">{formattedDate}</p>
                </div>

                {/* Heure */}
                {event.time && (
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <p className="text-white text-sm mb-2">Heure</p>
                    <p className="font-semibold">{event.time}</p>
                  </div>
                )}

                {/* Lieu */}
                {event.location && (
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <p className="text-white text-sm mb-2">Lieu</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                )}

                {/* Capacité (si disponible) */}
                {'capacity' in event && (
                  <div className="mb-6 pb-6 border-b border-gray-800">
                    <p className="text-white text-sm mb-2">Places</p>
                    <p className="font-semibold">{(event as Event).attendees}/{(event as Event).capacity}</p>
                  </div>
                )}

                {/* Catégorie */}
                <div>
                  <p className="text-white text-sm mb-2">Catégorie</p>
                  <p className="font-semibold">{categoryLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
