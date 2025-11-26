// Scheduled monitoring worker
const cron = require('node-cron');
const detectionService = require('./detectionService');
const logger = require('../utils/logger');
const { POLL_INTERVAL } = require('../utils/env');
module.exports = {
  start() {
    cron.schedule(`*/${POLL_INTERVAL} * * * *`, async () => {
      logger.info('Monitoring worker started');
      try {
        await detectionService.runAllDetections();
        logger.info('Monitoring worker completed');
      } catch (err) {
        logger.error(`Monitoring worker error: ${err.message}`);
      }
    });
    logger.info(`Monitoring scheduled every ${POLL_INTERVAL} minutes`);
  }
};
