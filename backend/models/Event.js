// backend/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  time: String,
  location: String,
  category: {
    type: String,
    enum: ['musique', 'peinture', 'danse'],
    required: true,
  },
  type: {
    type: String,
    enum: ['atelier', 'spectacle'],
    required: true,
  },
  capacity: {
    type: Number,
    default: 30,
  },
  attendees: {
    type: Number,
    default: 0,
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', eventSchema);
