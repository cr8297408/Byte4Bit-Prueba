const FilmService = require('./film.service');

async function getAllFilms(req, res, next) {
  try {
    const { page, size } = req.params;

    const films = await FilmService.getAll({ page, size }, page, size);
    res.status(films.getStatus()).json(films.getData());
  } catch (error) {
    next(error);
  }
}

async function getOneFilm(req, res, next) {
  try {
    const film = await FilmService.getOne();
    res.status(film.getStatus()).json(film.getData());
  } catch (error) {
    next(error);
  }
}

async function createFilm(req, res, next) {
  try {
    const film = await FilmService.create(req.body, req.headers['authorization']);
    res.status(film.getStatus()).json(film.getData());
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllFilms,
  getOneFilm,
  createFilm,
};
