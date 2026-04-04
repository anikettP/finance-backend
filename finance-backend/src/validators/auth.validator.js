const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('viewer', 'analyst', 'admin'),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
