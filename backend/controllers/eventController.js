// backend/controllers/eventController.js
const Event = require('../models/Event');

// Récupérer tous les événements
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouvel événement
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event({
      id: `event-${Date.now()}`,
      ...req.body,
      date: new Date(req.body.date),
    });
    
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer un événement par ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id });
    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un événement
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { id: req.params.id },
      {
        ...req.body,
        date: req.body.date ? new Date(req.body.date) : undefined,
        updatedAt: new Date(),
      },
      { new: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un événement
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ id: req.params.id });
    
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    
    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
