const Joi = require('joi');
const { stringMessages, password, email } = require('../base/base.schema');

const registerSchema = Joi.object().keys({
  name: Joi.string().min(3).max(12).messages(stringMessages('name', 12, 3)),
  password: password.required(),
  email: email.required(),
});

module.exports = {
  registerSchema,
};
