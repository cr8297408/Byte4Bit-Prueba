const { Router } = require('express');
const AuthRouter = require('./auth.route');

const router = Router();

router.use('/v1/auth', AuthRouter);

module.exports = {
  router,
};
