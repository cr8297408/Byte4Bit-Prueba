const { DataTypes, UUIDV4 } = require('sequelize');

const { FilmComment } = require('./film-comments.model');
const { USERS_TABLE, User } = require('./user.model');
const database = require('../connection');
const { Film } = require('./film.model');

const COMMENTS_TABLE = 'comments';
const Comment = database.define(
  'Comment',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.STRING,
      field: 'created_by',
      allowNull: false,
      references: {
        model: USERS_TABLE,
        key: 'id',
      },
    },
  },
  {
    tableName: COMMENTS_TABLE,
    timestamps: true,
  },
);

User.hasMany(Comment);
Comment.belongsTo(User);

Film.belongsToMany(Comment, { through: FilmComment, as: 'comments' });
Comment.belongsToMany(Film, { through: FilmComment, as: 'films' });

module.exports = {
  Comment,
  COMMENTS_TABLE,
};
