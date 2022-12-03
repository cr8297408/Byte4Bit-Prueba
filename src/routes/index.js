const { Router } = require('express');
const AuthRouter = require('./auth.route');
const FilmRouter = require('./films.route');
const { expressJWT } = require('../libs/jwt');
const router = Router();

router.use('/v1/auth', AuthRouter);
router.use(expressJWT);
router.use('/v1/films', FilmRouter);

module.exports = {
  router,
};
