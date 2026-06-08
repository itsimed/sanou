// backend/API_USAGE.md

# Utilisation de l'API depuis le Frontend

## Configuration de base

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const ADMIN_CODE = 'admin';

// Headers pour les requêtes admin
const adminHeaders = {
  'Content-Type': 'application/json',
  'x-admin-code': ADMIN_CODE,
};
```

## Exemples d'utilisation

### 1. Récupérer tous les événements

```javascript
const getEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events`);
  const events = await response.json();
  return events;
};
```

### 2. Créer un événement (Admin)

```javascript
const createEvent = async (eventData) => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      category: eventData.category,
      type: eventData.type,
      capacity: eventData.capacity,
      attendees: eventData.attendees,
      imageUrl: eventData.imageUrl,
    }),
  });
  
  if (!response.ok) throw new Error('Erreur lors de la création');
  return response.json();
};
```

### 3. Modifier un événement (Admin)

```javascript
const updateEvent = async (eventId, eventData) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'PUT',
    headers: adminHeaders,
    body: JSON.stringify(eventData),
  });
  
  if (!response.ok) throw new Error('Erreur lors de la modification');
  return response.json();
};
```

### 4. Supprimer un événement (Admin)

```javascript
const deleteEvent = async (eventId) => {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'DELETE',
    headers: adminHeaders,
  });
  
  if (!response.ok) throw new Error('Erreur lors de la suppression');
  return response.json();
};
```

## Structure de données Event

```javascript
{
  id: "event-1234567890",
  title: "Atelier Guitare",
  description: "Découvrez les bases de la guitare",
  date: "2026-05-23T00:00:00.000Z",
  time: "14:30",
  location: "Studio Sanouva",
  category: "musique", // musique | peinture | danse
  type: "atelier",     // atelier | spectacle
  capacity: 30,
  attendees: 15,
  imageUrl: "https://example.com/image.jpg",
  createdAt: "2026-05-23T10:00:00.000Z",
  updatedAt: "2026-05-23T10:00:00.000Z"
}
```

## Prochaines étapes

- [ ] Intégrer les appels API dans AdminPage.tsx
- [ ] Ajouter gestion des erreurs/loading states
- [ ] Implémenter la persistance des données
- [ ] Ajouter notifications utilisateur (toast/alerts)
