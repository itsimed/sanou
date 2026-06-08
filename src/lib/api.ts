// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ADMIN_CODE = 'admin';

export interface ApiEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  category: 'musique' | 'peinture' | 'danse';
  type: 'atelier' | 'spectacle';
  capacity?: number;
  attendees?: number;
  imageUrl?: string;
}

const adminHeaders = {
  'Content-Type': 'application/json',
  'x-admin-code': ADMIN_CODE,
};

// Récupérer tous les événements
export const getAllEvents = async (): Promise<ApiEvent[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des événements');
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

// Récupérer un événement par ID
export const getEventById = async (eventId: string): Promise<ApiEvent> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    if (!response.ok) throw new Error('Événement non trouvé');
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Créer un événement (Admin)
export const createEvent = async (eventData: Partial<ApiEvent>): Promise<ApiEvent | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Modifier un événement (Admin)
export const updateEvent = async (eventId: string, eventData: Partial<ApiEvent>): Promise<ApiEvent | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: adminHeaders,
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Erreur lors de la modification');
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Supprimer un événement (Admin)
export const deleteEvent = async (eventId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: adminHeaders,
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
    return true;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
