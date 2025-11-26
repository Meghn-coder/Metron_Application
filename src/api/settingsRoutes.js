// Express routes for settings APIs
const express = require('express');
const router = express.Router();
const { Settings } = require('../db/models');
router.get('/', async (req, res) => {
  const settings = await Settings.findOne();
  res.json(settings);
});
router.patch('/', async (req, res) => {
  const { pollInterval, token } = req.body;
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({ pollInterval, token });
  else {
    if (pollInterval) settings.pollInterval = pollInterval;
    if (token) settings.token = token;
    await settings.save();
  }
  res.json(settings);
});
module.exports = router;
