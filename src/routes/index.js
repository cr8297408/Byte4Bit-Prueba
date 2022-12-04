const { Router } = require('express');

const CategorieRouter = require('./categories.route');
const CommentRouter = require('./comments.route');
const { expressJWT } = require('../libs/jwt');
const FilmRouter = require('./films.route');
const AuthRouter = require('./auth.route');

const router = Router();

router.use('/v1/auth', AuthRouter);
router.use(expressJWT);
router.use('/v1/films', FilmRouter);
router.use('/v1/categories', CategorieRouter);
router.use('/v1/comments', CommentRouter);

module.exports = {
  router,
};
