// Service for detection logic
const { Document, Alert } = require('../db/models');
const patterns = require('../rules/sensitivePatterns');
const codaService = require('./codaService');
const logger = require('../utils/logger');
const { POLL_INTERVAL } = require('../utils/env');
const { Op } = require('sequelize');
const DAY_MS = 24 * 60 * 60 * 1000;
async function createAlert(docId, type, severity, message, metadata) {
  await Alert.create({ docId, type, severity, message, metadata });
  logger.warn(`Alert created: ${type} for doc ${docId}`);
}
module.exports = {
  async detectUnusedDocuments(days = 30) {
    const threshold = Date.now() - days * DAY_MS;
    const docs = await Document.findAll();
    for (const doc of docs) {
      if (doc.lastUpdated && doc.lastUpdated.getTime() < threshold) {
        await createAlert(doc.id, 'unused', 'medium', 'Document unused for threshold days', { lastUpdated: doc.lastUpdated });
      }
    }
  },
  async detectPublicSharing() {
    const docs = await Document.findAll();
    for (const doc of docs) {
      if (doc.isPublished) {
        await createAlert(doc.id, 'public_share', 'high', 'Document is published externally', {});
      }
    }
  },
  async scanTableSensitiveData(docId) {
    const tables = await codaService.listTables(docId);
    for (const table of tables) {
      const rows = await codaService.listRows(docId, table.id);
      for (const row of rows) {
        for (const field in row.values) {
          for (const [type, regex] of Object.entries(patterns)) {
            if (regex.test(String(row.values[field]))) {
              await createAlert(docId, 'sensitive_data', 'high', `Sensitive ${type} found in table ${table.name}`, { field, value: row.values[field], table: table.name });
            }
          }
        }
      }
    }
  },
  async scanPageContent(docId) {
    // Assume pages are listed as tables with type 'page'
    // For demo, skip actual page listing
    // Use codaService.exportPage if available
    // Strip HTML/MD and run regex
    const tables = await codaService.listTables(docId);
    for (const table of tables) {
      if (table.type === 'page') {
        const pageContent = await codaService.exportPage(docId, table.id);
        const textContent = pageContent.replace(/<[^>]+>/g, ''); // Strip HTML tags
        for (const [type, regex] of Object.entries(patterns)) {
          if (regex.test(textContent)) {
            await createAlert(docId, 'sensitive_data', 'high', `Sensitive ${type} found in page ${table.name}`, { table: table.name });
          }
        }
      }
    }
  },
  async runAllDetections() {
    await this.detectUnusedDocuments(POLL_INTERVAL);
    await this.detectPublicSharing();
    const docs = await Document.findAll();
    for (const doc of docs) {
      await this.scanTableSensitiveData(doc.id);
      await this.scanPageContent(doc.id);
    }
  }
};
