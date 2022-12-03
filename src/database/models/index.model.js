const { Comment } = require('./comment.model');
const { Film } = require('./film.model');
const { User } = require('./user.model');

const Models = [
  User,
  Film,
  Comment,
];

module.exports = { Models };
