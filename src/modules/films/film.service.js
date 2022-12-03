const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const BaseService = require('../base/base.service');

const { Film } = require('../../database/models/film.model');
const { applyFilters } = require('../../utils/filters');
const { Categorie } = require('../../database/models/categories.model');
const { getData } = require('../../utils/get-data-token');

class FilmService extends BaseService {
  constructor() {
    super(Film);
  }

  async getAll(filters, page, size) {
    if (filters.name || filters.gender) {
      let where = {};

      const filter1 = applyFilters('name', filters.name, []);

      const filter2 = applyFilters('gender', filters.gender, filter1);

      where = {
        [Op.or]: filter2,
      };

      const response = await super.getAll(where, page, size);
      return response;
    }

    const response = await super.getAll({}, page, size);
    return response;
  }

  async create(body, bearerHeader) {
    const dataToken = await getData(bearerHeader);
    console.log('🚀 ~ file: film.service.js:38 ~ FilmService ~ create ~ dataToken', dataToken);

    body.createdBy =  dataToken.id;
    console.log('🚀 ~ file: film.service.js:40 ~ FilmService ~ create ~ body', body);
    
    const filmCreated = await super.create(body);

    return filmCreated;
  }
}

module.exports = new FilmService();
