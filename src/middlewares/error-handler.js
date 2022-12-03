const boom = require('@hapi/boom');
/**
 * for convert errors not controlles in boom error
 * @param {*} req
 * @param {*} res
 * @param {*} error
 */
async function errorHandler(req, res, error) {
  const err = boom.badRequest(error);

  const { output } = err;

  res.status(500).json(output.payload);
}

/**
 * for return and control errors of tipe boom
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function boomErrorHandler(error, req, res, next) {
  if (!error.isBoom) {
    next(error);
  }

  const { output } = error;

  res.status(output.statusCode).json(output.payload);
}

module.exports = {
  errorHandler,
  boomErrorHandler,
};
