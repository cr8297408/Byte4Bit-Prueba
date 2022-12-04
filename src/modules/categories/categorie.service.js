const boom = require("@hapi/boom");
const { Categorie } = require("../../database/models/categories.model");
const { getData } = require("../../utils/get-data-token");
const BaseService = require("../base/base.service");

class CategorieService extends BaseService {
	constructor(){
		super(Categorie)
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