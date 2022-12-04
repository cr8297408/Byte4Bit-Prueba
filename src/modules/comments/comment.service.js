const { Comment } = require("../../database/models/comment.model");
const { FilmComment } = require("../../database/models/film-comments.model");
const { applyFilters } = require("../../utils/filters");
const { getData } = require("../../utils/get-data-token");
const BaseService = require("../base/base.service");

class CommentService extends BaseService {
	constructor() {
		super(Comment)
	}

  async getAll(filters, page, size) {
    if (filters.UserId) {
      let where = { 'created_by': filters.UserId };

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

    body.UserId =  dataToken.id;
    
    const commentCreated = await super.create(body);

    const associateComment = await FilmComment.create({
      FilmId: body.filmId,
      CommentId: commentCreated.getData().data.id, 
    })
    console.log("🚀 ~ file: comment.service.js:22 ~ CommentService ~ create ~ associateComment", associateComment)

    return commentCreated;
  }
}

module.exports = new CommentService();