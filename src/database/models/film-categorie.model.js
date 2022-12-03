const { DataTypes } = require('sequelize');
const database = require('../connection');
const { CATEGORIES_TABLE } = require('./categories.model');
const { FILMS_TABLE, Film } = require('./film.model');

const FILM_CATEGORIE_TABLE = 'film_categories_table';
const FilmCategorie = database.define(
  'FilmCategorieTable',
  {
    categorieId: {
      type: DataTypes.STRING,
      field: 'categorie_id',
      allowNull: false,
      references: {
        model: CATEGORIES_TABLE,
        key: 'id',
      },
    },
    filmId: {
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
    tableName: FILM_CATEGORIE_TABLE,
    timestamps: true,
  },
);

module.exports = {
  FilmCategorie,
  FILM_CATEGORIE_TABLE,
};
