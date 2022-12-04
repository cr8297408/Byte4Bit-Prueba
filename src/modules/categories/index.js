const CategorieService = require('./categorie.service');

async function getAllCategories(req, res, next) {
  try {
    const { page, size } = req.query;
    
    const categories = await CategorieService.getAll({}, page, size);
    res.status(categories.getStatus()).json(categories.getData());
  } catch (error) {
    next(error);
  }
}

async function getOneCategorie(req, res, next) {
  try {
    const categorie = await CategorieService.getOne();
    res.status(categorie.getStatus()).json(categorie.getData());
  } catch (error) {
    next(error);
  }
}

async function createCategorie(req, res, next) {
  try {
    const categorie = await CategorieService.create(req.body, req.headers['authorization']);
    res.status(categorie.getStatus()).json(categorie.getData());
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllCategories,
  getOneCategorie,
  createCategorie,
};
