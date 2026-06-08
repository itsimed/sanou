export type DisciplineCategory = 'musique' | 'peinture' | 'danse';
export type EventType = 'atelier' | 'spectacle';

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description?: string;
  category: DisciplineCategory;
  type: EventType;
  time?: string;
  location?: string;
}
