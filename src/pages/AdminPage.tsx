import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';
import { Footer } from '../components/Footer';
import { getAllEvents, createEvent, updateEvent, deleteEvent, type ApiEvent } from '../lib/api';

type AdminTab = 'auth' | 'events';
type EventCategory = 'musique' | 'peinture' | 'danse';
type EventType = 'atelier' | 'spectacle';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('events');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCode === 'admin') {
      setIsAuthenticated(true);
      setCodeError('');
      setAdminCode('');
    } else {
      setCodeError('Code d\'accès incorrect');
      setAdminCode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('events');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />

        <Breadcrumb />
        <main className="flex-grow flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="bg-black border border-white p-8">
              <h1 className="text-3xl font-bold mb-2">Accès Admin</h1>
              <p className="text-white mb-6">Entrez le code d'accès pour continuer</p>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    placeholder="Code d'accès"
                    autoFocus
                    className="w-full px-4 py-3 bg-black border border-white text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  />
                  {codeError && <p className="text-red-500 text-sm mt-2">{codeError}</p>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-4 py-3 bg-white text-black font-semibold hover:shadow-lg transition-all"
                >
                  Accéder
                </motion.button>
              </form>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <Breadcrumb />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold">Panneau Admin</h1>
              <p className="text-white mt-2">Gérez les événements de Sanouva Bien</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-black font-semibold hover:shadow-lg transition-all"
            >
              Déconnexion
            </motion.button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'events'
                  ? 'bg-white text-black'
                  : 'bg-black text-white border border-white hover:bg-gray-900'
              }`}
            >
              Événements
            </motion.button>
          </div>
        </motion.div>

        {/* Événements Tab */}
        {activeTab === 'events' && <AdminEventsSection />}
      </main>

      <Footer />
    </div>
  );
}

function AdminEventsSection() {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'musique' as 'musique' | 'peinture' | 'danse',
    type: 'atelier' as 'atelier' | 'spectacle',
    capacity: 30,
    attendees: 0,
    imageUrl: '',
  });

  // Charger les événements au mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await getAllEvents();
      setEvents(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des événements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'musique',
      type: 'atelier',
      capacity: 30,
      attendees: 0,
      imageUrl: '',
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleEditEvent = (event: ApiEvent) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description || '',
      date: event.date,
      time: event.time || '',
      location: event.location || '',
      category: event.category,
      type: event.type,
      capacity: event.capacity || 30,
      attendees: event.attendees || 0,
      imageUrl: event.imageUrl || '',
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateEvent(editingId, formData);
        setSuccess('Événement modifié avec succès!');
      } else {
        await createEvent(formData);
        setSuccess('Événement créé avec succès!');
      }
      await loadEvents();
      setShowForm(false);
      setEditingId(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Erreur lors de la sauvegarde: ' + (err instanceof Error ? err.message : 'Erreur inconnue'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      setLoading(true);
      try {
        await deleteEvent(id);
        setSuccess('Événement supprimé avec succès!');
        await loadEvents();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Erreur lors de la suppression: ' + (err instanceof Error ? err.message : 'Erreur inconnue'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setError('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Messages */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-black border border-white text-white">
          {error}
        </motion.div>
      )}
      {success && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-black border border-white text-white">
          {success}
        </motion.div>
      )}

      {loading && (
        <div className="text-center py-8">
          <p className="text-white">Chargement...</p>
        </div>
      )}

      {/* Bouton Ajouter */}
      {!showForm && !loading && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddEvent}
          className="px-6 py-3 bg-white text-black font-semibold hover:shadow-lg transition-all"
        >
          + Ajouter un événement
        </motion.button>
      )}

      {/* Formulaire */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black border border-white p-8"
        >
          <h2 className="text-2xl font-bold mb-6">{editingId ? 'Modifier l\'événement' : 'Ajouter un événement'}</h2>

          <form onSubmit={handleSaveEvent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Titre *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-black border border-white text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  placeholder="Titre de l'événement"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Heure</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Lieu</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                  placeholder="Lieu de l'événement"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Catégorie *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                  className="w-full px-4 py-2 bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                >
                  <option value="musique">Musique</option>
                  <option value="peinture">Peinture</option>
                  <option value="danse">Danse</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
                  className="w-full px-4 py-2 bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                >
                  <option value="atelier">Atelier</option>
                  <option value="spectacle">Spectacle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Capacité</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-2 bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Participants</label>
                <input
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) })}
                  min="0"
                  className="w-full px-4 py-2 bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-black border border-white text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                placeholder="Description détaillée"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">URL Image</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-white text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-white text-black font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {editingId ? 'Mettre à jour' : 'Créer'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-white text-white font-semibold hover:bg-gray-900 transition-all disabled:opacity-50"
              >
                Annuler
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Liste des événements */}
      {!showForm && !loading && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{events.length} événement{events.length !== 1 ? 's' : ''}</h2>

          {events.length === 0 ? (
            <p className="text-white text-center py-12">Aucun événement. Commencez par ajouter un événement.</p>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black border border-white p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-white">
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <p>{event.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Heure:</span>
                        <p>{event.time || '-'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Catégorie:</span>
                        <p className="capitalize">{event.category}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Participants:</span>
                        <p>
                          {event.attendees}/{event.capacity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditEvent(event)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-white text-black font-semibold hover:shadow-lg transition-all"
                    >
                      Modifier
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteEvent(event.id)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-white text-white hover:bg-gray-900 transition-all"
                    >
                      Supprimer
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
