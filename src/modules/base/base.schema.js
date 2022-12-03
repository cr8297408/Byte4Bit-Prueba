const Joi = require('joi');

const numberMessages = (a, max, min) => {
  const object = {
    'number.base': `${a} should be a type of 'integer'`,
    'number.empty': `${a} cannot be an empty field`,
    'number.min': `"${a}" should have a minimum length of ${min}`,
    'number.max': `"${a}" should have a maximum length of ${max}`,
    'any.required': `"${a}" is a required field`,
  };

  return object;
};

const stringMessages = (a, max, min) => {
  const object = {
    'string.base': `${a} should be a type of 'text'`,
    'string.empty': `${a} cannot be an empty field`,
    'string.min': `"${a}" should have a minimum length of ${min}`,
    'string.max': `"${a}" should have a maximum length of ${max}`,
    'any.required': `"${a}" is a required field`,
  };

  return object;
};

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net', 'co'] },
});

function passwordRegex() {
  return '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])';
}

const password = Joi.string()
  .min(8)
  .pattern(new RegExp(passwordRegex()))
  .label(
    'Password should contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
  );

const idSchema = Joi.object().keys({
  id: Joi.string().required().messages(stringMessages('id')),
});

module.exports = {
  numberMessages,
  stringMessages,
  email,
  password,
  idSchema,
};
