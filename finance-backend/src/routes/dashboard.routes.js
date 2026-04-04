const express = require('express');
const {
  getSummary,
  getMonthlyTrend,
} = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

// protect all routes below
router.use(protect);

router.get('/summary', authorize('analyst', 'admin'), getSummary);
router.get('/monthly', authorize('analyst', 'admin'), getMonthlyTrend);

module.exports = router;
