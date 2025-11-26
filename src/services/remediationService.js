// Service for remediation actions
// Remediation actions for SecureCoda
const codaService = require('./codaService');
const { Alert, Document } = require('../db/models');
const logger = require('../utils/logger');
module.exports = {
  async removeExternalShare(docId) {
    // Placeholder: call Coda API to remove share
    logger.info(`Removed external share for doc ${docId}`);
    await Alert.update({ status: 'resolved' }, { where: { docId, type: 'public_share' } });
  },
  async unpublishDocument(docId) {
    // Placeholder: call Coda API to unpublish
    logger.info(`Unpublished doc ${docId}`);
    await Alert.update({ status: 'resolved' }, { where: { docId, type: 'public_share' } });
  },
  async deleteRow(docId, tableId, rowId) {
    // Placeholder: call Coda API to delete row
    logger.info(`Deleted row ${rowId} in table ${tableId} of doc ${docId}`);
    await Alert.update({ status: 'resolved' }, { where: { docId, type: 'sensitive_data' } });
  },
  async deleteDocument(docId) {
    // Placeholder: call Coda API to delete document
    logger.info(`Deleted document ${docId}`);
    await Alert.update({ status: 'resolved' }, { where: { docId } });
    await Document.destroy({ where: { id: docId } });
  }
};
