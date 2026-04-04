const authService = require('../services/auth.service');
const sendResponse = require('../utils/response.util');

const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    sendResponse(res, 201, true, 'User registered successfully', data);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    sendResponse(res, 200, true, 'Login successful', data);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await authService.getUsers();
    sendResponse(res, 200, true, 'Users fetched successfully', users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await authService.updateUser(req.params.id, req.body);
    sendResponse(res, 200, true, 'User updated successfully', user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await authService.deleteUser(req.params.id);
    sendResponse(res, 200, true, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
};
