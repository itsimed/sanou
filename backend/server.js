require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Backend Sanouva actif' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvee' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Backend demarre sur http://localhost:${PORT}`);
    console.log(`API evenements: http://localhost:${PORT}/api/events`);
  });
};

startServer().catch((error) => {
  console.error('Impossible de demarrer le backend:', error.message);
  process.exit(1);
});

module.exports = app;
