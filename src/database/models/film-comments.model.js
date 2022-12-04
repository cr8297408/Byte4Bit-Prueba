const { DataTypes } = require('sequelize');
const database = require('../connection');
const { COMMENTS_TABLE } = require('./comment.model');
const { FILMS_TABLE } = require('./film.model');

const FILM_COMMENTS_TABLE = 'film_comments_table';
const FilmComment = database.define(
  'FilmComment',
  {
    CommentId: {
      type: DataTypes.STRING,
      field: 'comment_id',
      allowNull: false,
      references: {
        model: COMMENTS_TABLE,
        key: 'id',
      },
    },
    FilmId: {
      type: DataTypes.STRING,
      field: 'film_id',
      allowNull: false,
      references: {
        model: FILMS_TABLE,
        key: 'id',
      },
    },
  },
  {
    tableName: FILM_COMMENTS_TABLE,
    timestamps: true,
  },
);

module.exports = {
  FilmComment,
  FILM_COMMENTS_TABLE,
};
