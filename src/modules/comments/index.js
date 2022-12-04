const CommentService = require('./comment.service');

async function getAllComments(req, res, next) {
  try {
    const { page, size } = req.query;

    const { UserId } = req.query
    
    const comments = await CommentService.getAll({ UserId }, page, size, { all: true});
    res.status(comments.getStatus()).json(comments.getData());
  } catch (error) {
    next(error);
  }
}

async function getOneComment(req, res, next) {
  try {
    const comment = await CommentService.getOne({}, { all: true});
    res.status(comment.getStatus()).json(comment.getData());
  } catch (error) {
    next(error);
  }
}

async function createComment(req, res, next) {
  try {
    const comment = await CommentService.create(req.body, req.headers['authorization']);
    res.status(comment.getStatus()).json(comment.getData());
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllComments,
  getOneComment,
  createComment,
};
