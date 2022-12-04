const Joi = require('joi');

const createCategorieSchema = Joi.object().keys({
	name: Joi.string().min(3).required(),
})

module.exports = {
	createCategorieSchema,
}