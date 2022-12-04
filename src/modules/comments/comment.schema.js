const Joi = require('joi');

const createCommentSchema = Joi.object().keys({
	text: Joi.string().min(3),
	filmId: Joi.string().length(36)
})

module.exports = {
	createCommentSchema,
}