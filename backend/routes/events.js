// backend/routes/events.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authAdmin = require('../middleware/authAdmin');

// Routes publiques
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

// Routes protégées (admin)
router.post('/', authAdmin, eventController.createEvent);
router.put('/:id', authAdmin, eventController.updateEvent);
router.delete('/:id', authAdmin, eventController.deleteEvent);

module.exports = router;
