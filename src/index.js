// Backend entry point
const app = require('./app');
const { sequelize } = require('./db/models');
const monitoringWorker = require('./services/monitoringWorker');
const { PORT } = require('./utils/env');
(async () => {
  await sequelize.sync();
  monitoringWorker.start();
  app.listen(PORT, () => {
    console.log(`SecureCoda backend running on port ${PORT}`);
  });
})();
