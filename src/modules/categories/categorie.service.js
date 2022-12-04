const boom = require("@hapi/boom");
const { Categorie } = require("../../database/models/categories.model");
const { applyFilters } = require("../../utils/filters");
const { getData } = require("../../utils/get-data-token");
const BaseService = require("../base/base.service");

class CategorieService extends BaseService {
	constructor(){
		super(Categorie)
	}

	async getAll(filters, page, size) {
    if (filters.name) {
      let where = {};

      where = applyFilters(filters.name, 'name', []);

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

		for (let i = 0; i < body.name.length; i++) {
			if (!isNaN(body.name[i]) && body.name[i] !== ' ' ) throw boom.badRequest('name cannot have numbers')
		}

    body.createdBy =  dataToken.id;
    
    const categorieCreated = await super.create(body);

    return categorieCreated;
  }
}

module.exports = new CategorieService();