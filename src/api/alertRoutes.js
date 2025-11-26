// Express routes for alert APIs
const express = require('express');
const router = express.Router();
const { Alert } = require('../db/models');

router.get('/', async (req, res) => {
  const alerts = await Alert.findAll();
  res.json(alerts);
});

router.get('/:id', async (req, res) => {
  const alert = await Alert.findByPk(req.params.id);
  if (!alert) return res.status(404).json({ error: 'Alert not found' });
  res.json(alert);
});

router.patch('/:id/resolve', async (req, res) => {
  const alert = await Alert.findByPk(req.params.id);
  if (!alert) return res.status(404).json({ error: 'Alert not found' });
  alert.status = 'resolved';
  await alert.save();
  res.json(alert);
});

module.exports = router;
