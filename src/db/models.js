// Sequelize models for SecureCoda
const { Sequelize, DataTypes } = require('sequelize');
const { DB_URL } = require('../utils/env');
const sequelize = new Sequelize(DB_URL, { logging: false });
const Document = sequelize.define('Document', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
  lastAccessed: DataTypes.DATE,
  lastUpdated: DataTypes.DATE,
  isPublished: DataTypes.BOOLEAN
});
const Alert = sequelize.define('Alert', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  docId: { type: DataTypes.STRING, references: { model: Document, key: 'id' } },
  type: DataTypes.STRING,
  severity: DataTypes.STRING,
  message: DataTypes.STRING,
  status: { type: DataTypes.STRING, defaultValue: 'active' },
  metadata: DataTypes.JSON,
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});
const Settings = sequelize.define('Settings', {
  pollInterval: DataTypes.INTEGER,
  token: DataTypes.STRING,
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});
module.exports = { sequelize, Document, Alert, Settings };
