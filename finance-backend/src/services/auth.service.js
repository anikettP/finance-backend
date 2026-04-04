const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const register = async (userData) => {
  const { name, email, password, role } = userData;
  const user = await User.create({ name, email, password, role });
  return {
    user,
    token: generateToken(user._id),
  };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  if (user.status === 'inactive') {
    throw new ErrorResponse('User account is inactive', 403);
  }

  return {
    user,
    token: generateToken(user._id),
  };
};

// Admin role functions
const getUsers = async () => User.find({ isDeleted: false });

const updateUser = async (id, updateData) =>
  User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

const deleteUser = async (id) =>
  User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
};
