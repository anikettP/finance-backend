const express = require('express');
const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require('../controllers/record.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateRecord } = require('../validators/record.validator');

const router = express.Router();

// protect all routes below
router.use(protect);

router.get('/', authorize('viewer', 'analyst', 'admin'), getRecords);
router.get('/:id', authorize('viewer', 'analyst', 'admin'), getRecordById);

// Admin only routes for modification
router.post('/', authorize('admin'), validateRecord, createRecord);
router.put('/:id', authorize('admin'), validateRecord, updateRecord);
router.delete('/:id', authorize('admin'), deleteRecord);

module.exports = router;
