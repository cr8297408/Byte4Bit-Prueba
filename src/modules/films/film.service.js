const { Op } = require('sequelize');

const { FilmCategorie } = require('../../database/models/film-categorie.model');
const { Categorie } = require('../../database/models/categories.model');
const { Film } = require('../../database/models/film.model');
const { getData } = require('../../utils/get-data-token');
const { applyFilters } = require('../../utils/filters');
const BaseService = require('../base/base.service');

class FilmService extends BaseService {
  constructor() {
    super(Film);
  }

  async getAll(filters, page, size) {
    if (filters.name || filters.gender) {
      let where = {};

      const filter1 = applyFilters(filters.name, 'name', []);

      const filter2 = applyFilters(filters.gender, 'gender', filter1);

      where = {
        [Op.or]: filter2,
      };

      const response = await super.getAll(where, page, size, {
        all: true
      });
      return response;
    }

    const response = await super.getAll({}, page, size, {
      all: true
    });
    return response;
  }

  async create(body, bearerHeader) {
    const dataToken = await getData(bearerHeader);

    body.createdBy =  dataToken.id;
    
    const filmCreated = await super.create(body);

    if (body.categories.length > 0) {
      for (let i = 0; i < body.categories.length; i++) {
        
        FilmCategorie.create({
          FilmId: filmCreated.getData().data.id,
          CategorieId: body.categories[i], 
        })
        
      }
    }
    return filmCreated;
  }
}

module.exports = new FilmService();
