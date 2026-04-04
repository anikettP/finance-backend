const Joi = require('joi');

const recordSchema = Joi.object({
  amount: Joi.number().min(0.01).required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required(),
  date: Joi.date().iso(),
  note: Joi.string().allow('', null),
});

const validateRecord = (req, res, next) => {
  const { error } = recordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = { validateRecord };
