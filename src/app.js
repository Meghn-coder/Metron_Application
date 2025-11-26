// Express app setup
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const alertRoutes = require('./api/alertRoutes');
const remediationRoutes = require('./api/remediationRoutes');
const settingsRoutes = require('./api/settingsRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/alerts', alertRoutes);
app.use('/remediate', remediationRoutes);
app.use('/settings', settingsRoutes);
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: err.message });
});
module.exports = app;
