import { motion } from 'framer-motion';
import type { CalendarEvent } from '../types/calendar';
import { CATEGORY_COLORS } from '../data/calendarEvents';

export function CalendarDayCard({
  dayOfMonth,
  dayOfWeek,
  isToday,
  isCurrentMonth,
  events,
  isActive,
  onSelect,
}: {
  dayOfMonth: number;
  dayOfWeek: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ flex: isActive ? 1.5 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={onSelect}
      className={`relative rounded-2xl p-4 sm:p-6 transition-all cursor-pointer flex-1 basis-[calc(100%/5-3.2px)] sm:basis-[calc(100%/2-3.2px)] min-w-[150px] ${
        isCurrentMonth
          ? 'bg-white/8 backdrop-blur-md border border-white/10 hover:border-white/20'
          : 'bg-black/30 border border-white/5'
      } ${isActive ? 'ring-2 ring-violet-400 bg-gradient-to-br from-violet-400/20' : 'min-h-56'} flex flex-col`}
      role="article"
      aria-label={`${dayOfMonth} ${dayOfWeek}${isToday ? ' - Aujourd\'hui' : ''}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-bold text-white">{dayOfMonth}</span>
          </div>
          <p className="text-sm text-white/60 mt-1">{dayOfWeek}</p>
        </div>
        {events.length > 0 && (
          <div className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[events[0].category].colorDot}`} />
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-white/20 to-transparent mb-4" />

      <div className="flex-grow space-y-3">
        {events.length === 0 ? (
          <p className="text-white/40 text-sm italic">Aucun événement</p>
        ) : (
          <ul className="space-y-2">
            {events.map((event) => (
              <li key={event.id}>
                <a
                  href={`/event/${event.id}`}
                  className={`block p-2 rounded text-sm border-l-4 transition-all hover:scale-105 ${CATEGORY_COLORS[event.category].colorBorder} ${CATEGORY_COLORS[event.category].colorBg}`}
                >
                  <p className="font-semibold text-white">{event.title}</p>
                  {event.time && <p className="text-xs text-white/50">{event.time}</p>}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
