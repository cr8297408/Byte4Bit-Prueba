const Joi = require('joi');
const { stringMessages } = require('../base/base.schema');

const createFilmSchema = Joi.object({
  name: Joi.string().min(3).max(25).messages(stringMessages('name', 25, 3)),
  gender: Joi.string().min(4).max(15).messages(stringMessages('gender', 15)),
  categories: Joi.array()
    .items(
      Joi.string().min(36).max(36).messages(stringMessages('id', 36, 36)),
    )
    .max(2),
});

module.exports = {
  createFilmSchema,
};
