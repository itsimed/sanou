import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';
import { CalendarMonthSection } from '../components/CalendarMonthSection';
import { CalendarNavigationButton } from '../components/CalendarNavigationButton';
import { CALENDAR_EVENTS, MONTHS_LABELS } from '../data/calendarEvents';
import { getAllEvents, type ApiEvent } from '../lib/api';
import type { CalendarEvent } from '../types/calendar';

export function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(CALENDAR_EVENTS);

  // Charger les événements du backend au mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const backendEvents = await getAllEvents();
      // Convertir les événements du backend au format calendrier
      const convertedEvents: CalendarEvent[] = backendEvents.map((event: ApiEvent) => ({
        id: event.id,
        date: new Date(event.date),
        title: event.title,
        description: event.description || '',
        category: event.category,
        type: event.type,
        time: event.time || '',
        location: event.location || '',
        capacity: event.capacity || 30,
        attendees: event.attendees || 0,
      }));
      setCalendarEvents(convertedEvents);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      // Garder les événements locaux en cas d'erreur
    }
  };

  const minYear = today.getFullYear() - 2;
  const maxYear = today.getFullYear() + 2;

  const canGoPrev = currentYear > minYear || (currentYear === minYear && currentMonth > 0);
  const canGoNext = currentYear < maxYear || (currentYear === maxYear && currentMonth < 11);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const filteredEvents = useMemo(
    () => calendarEvents.filter((e) => e.date.getMonth() === currentMonth && e.date.getFullYear() === currentYear),
    [currentMonth, currentYear, calendarEvents],
  );

  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#0a0a0a] text-white flex flex-col">
      <Header />
      <Breadcrumb />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">Calendrier Sanouva</h1>
          <p className="text-white/60 text-lg">Découvrez tous nos événements : ateliers, spectacles et exhibitions</p>
        </motion.div>

        <motion.div key={`${currentMonth}-${currentYear}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {/* Mois avec boutons de navigation */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <CalendarNavigationButton direction="prev" onClick={handlePrevMonth} disabled={!canGoPrev} ariaLabel="Mois précédent" />
            <div className="text-center">
              <p className="text-3xl font-semibold">{MONTHS_LABELS[currentMonth]}</p>
              <p className="text-sm text-white/50">{currentYear}</p>
            </div>
            <CalendarNavigationButton direction="next" onClick={handleNextMonth} disabled={!canGoNext} ariaLabel="Mois suivant" />
          </div>

          <CalendarMonthSection
            month={currentMonth}
            year={currentYear}
            events={filteredEvents}
            activeDay={activeDay}
            onSelectDay={setActiveDay}
          />
        </motion.div>

        {!isCurrentMonth && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 20 }} className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentMonth(today.getMonth());
                setCurrentYear(today.getFullYear());
              }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold hover:shadow-lg"
            >
              Aujourd'hui
            </motion.button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
