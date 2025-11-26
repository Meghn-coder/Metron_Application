// Express routes for remediation APIs
const express = require('express');
const router = express.Router();
const remediationService = require('../services/remediationService');
router.post('/unpublish', async (req, res) => {
  const { docId } = req.body;
  await remediationService.unpublishDocument(docId);
  res.json({ success: true });
});
router.post('/remove-share', async (req, res) => {
  const { docId } = req.body;
  await remediationService.removeExternalShare(docId);
  res.json({ success: true });
});
router.delete('/delete-row', async (req, res) => {
  const { docId, tableId, rowId } = req.body;
  await remediationService.deleteRow(docId, tableId, rowId);
  res.json({ success: true });
});
router.delete('/delete-doc', async (req, res) => {
  const { docId } = req.body;
  await remediationService.deleteDocument(docId);
  res.json({ success: true });
});
module.exports = router;
