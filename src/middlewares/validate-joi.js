const boom = require('@hapi/boom');

/**
 * for validate the schema data in route level;
 * @param {*} schema
 * @param {*} property
 * @returns
 */
function validateJoi(schema, property) {
  return (req, res, next) => {
    try {
      const data = req[property];

      const { error } = schema.validate(data, { abortEarly: false });

      if (error) throw boom.badRequest(error);

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  validateJoi,
};
