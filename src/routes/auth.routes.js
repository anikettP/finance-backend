const express = require('express');
const {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateRegister, validateLogin } = require('../validators/auth.validator');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Admin only routes
router.get('/users', protect, authorize('admin'), getUsers);
router.put('/users/:id', protect, authorize('admin'), updateUser);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
