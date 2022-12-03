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
  console.log('🚀 ~ file: error-handler.js:25 ~ boomErrorHandler ~ error', error);
  if (!error.isBoom) {
    next(error);
  }

  const { output } = error;

  res.status(output.statusCode).json(output.payload);
}

function jwtErrorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    const error = boom.unauthorized('invalid token...');
    next(error);
  }
  
  next(err)
}

module.exports = {
  errorHandler,
  boomErrorHandler,
  jwtErrorHandler,
};
