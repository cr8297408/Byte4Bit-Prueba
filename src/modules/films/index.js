const FilmService = require('./film.service');

async function getAllFilms(req, res, next) {
  try {
    const { name, gender, page, size } = req.query;

    const films = await FilmService.getAll({name, gender}, page, size);
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
    console.log("🚀 ~ file: index.js:30 ~ createFilm ~ error", error)
    next(error);
  }
}

module.exports = {
  getAllFilms,
  getOneFilm,
  createFilm,
};
