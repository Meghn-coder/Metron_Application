// Service for Coda API integration
const axios = require('axios');
const logger = require('../utils/logger');
const { CODA_API_TOKEN } = require('../utils/env');
const BASE_URL = 'https://coda.io/apis/v1';
const api = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${CODA_API_TOKEN}` }
});
async function requestWithRetry(config, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await api(config);
    } catch (err) {
      logger.error(`Coda API error: ${err.message}`);
      if (i === retries - 1) throw err;
      await new Promise(res => setTimeout(res, 1000 * (i + 1)));
    }
  }
}
module.exports = {
  async listDocuments() {
    try {
      let items = [];
      let pageToken;
      do {
        const res = await requestWithRetry({ url: `/docs${pageToken ? `?pageToken=${pageToken}` : ''}` });
        items = items.concat(res.data.items);
        pageToken = res.data.nextPageToken;
      } while (pageToken);
      logger.info('Fetched documents from Coda');
      return items;
    } catch (err) {
      logger.error('Failed to list documents');
      throw err;
    }
  },
  async getDocumentMetadata(docId) {
    try {
      const res = await requestWithRetry({ url: `/docs/${docId}` });
      logger.info(`Fetched metadata for doc ${docId}`);
      return res.data;
    } catch (err) {
      logger.error(`Failed to get metadata for doc ${docId}`);
      throw err;
    }
  },
  async listTables(docId) {
    try {
      let items = [];
      let pageToken;
      do {
        const res = await requestWithRetry({ url: `/docs/${docId}/tables${pageToken ? `?pageToken=${pageToken}` : ''}` });
        items = items.concat(res.data.items);
        pageToken = res.data.nextPageToken;
      } while (pageToken);
      logger.info(`Fetched tables for doc ${docId}`);
      return items;
    } catch (err) {
      logger.error(`Failed to list tables for doc ${docId}`);
      throw err;
    }
  },
  async listRows(docId, tableId) {
    try {
      let items = [];
      let pageToken;
      do {
        const res = await requestWithRetry({ url: `/docs/${docId}/tables/${tableId}/rows${pageToken ? `?pageToken=${pageToken}` : ''}` });
        items = items.concat(res.data.items);
        pageToken = res.data.nextPageToken;
      } while (pageToken);
      logger.info(`Fetched rows for table ${tableId} in doc ${docId}`);
      return items;
    } catch (err) {
      logger.error(`Failed to list rows for table ${tableId} in doc ${docId}`);
      throw err;
    }
  },
  async exportPage(docId, pageId, format = 'html') {
    try {
      const res = await requestWithRetry({ url: `/docs/${docId}/pages/${pageId}/export?format=${format}` });
      logger.info(`Exported page ${pageId} from doc ${docId} as ${format}`);
      return res.data;
    } catch (err) {
      logger.error(`Failed to export page ${pageId} from doc ${docId}`);
      throw err;
    }
  }
};
