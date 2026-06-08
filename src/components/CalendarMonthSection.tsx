import { useMemo } from 'react';
import type { CalendarEvent } from '../types/calendar';
import { CalendarDayCard } from './CalendarDayCard';
import { DAYS_OF_WEEK, MONTHS_LABELS } from '../data/calendarEvents';

interface CalendarDayEntry {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

export function CalendarMonthSection({
  month,
  year,
  events,
  activeDay,
  onSelectDay,
}: {
  month: number;
  year: number;
  events: CalendarEvent[];
  activeDay: number | null;
  onSelectDay: (day: number | null) => void;
}) {
  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [month, year]);

  const daysArray = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: CalendarDayEntry[] = [];

    // Jours courants avec événements seulement
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      d.setHours(0, 0, 0, 0);
      const dayEvents = events.filter((e) => {
        const ed = new Date(e.date);
        ed.setHours(0, 0, 0, 0);
        return ed.getTime() === d.getTime();
      });
      
      // N'ajouter le jour que s'il a des événements
      if (dayEvents.length > 0) {
        days.push({ date: d, dayOfMonth: i, dayOfWeek: DAYS_OF_WEEK[d.getDay()], isToday: d.getTime() === today.getTime(), isCurrentMonth: true, events: dayEvents });
      }
    }

    // Trier par numéro de jour
    days.sort((a, b) => a.dayOfMonth - b.dayOfMonth);

    return days;
  }, [month, year, daysInMonth, events]);

  return (
    <section className="w-full" aria-label={`Calendrier ${MONTHS_LABELS[month]} ${year}`} aria-live="polite">
      <div className="flex flex-wrap gap-4">
        {daysArray.map((day, idx) => (
          <CalendarDayCard
            key={idx}
            dayOfMonth={day.dayOfMonth}
            dayOfWeek={day.dayOfWeek}
            isToday={day.isToday}
            isCurrentMonth={day.isCurrentMonth}
            events={day.events}
            isActive={activeDay === day.dayOfMonth}
            onSelect={() => onSelectDay(activeDay === day.dayOfMonth ? null : day.dayOfMonth)}
          />
        ))}
      </div>
    </section>
  );
}
