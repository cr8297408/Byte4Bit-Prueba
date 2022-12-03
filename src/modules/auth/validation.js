const Joi = require('joi');
const { stringMessages, password, email } = require('../base/base.schema');

const registerSchema = Joi.object().keys({
  name: Joi.string().min(3).max(12).messages(stringMessages('name', 12, 3)),
  password: password.required(),
  email: email.required(),
});

const loginSchema = Joi.object().keys({
  email: email.required(),
  password: password.required(),
});

const forgotPassSchema = Joi.object().keys({
  email: email.required(),
});

const newPassSchema = Joi.object().keys({
  password: password.required(),
  token: Joi.string(),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPassSchema,
  newPassSchema,
};
