const { CATEGORIES_TABLE } = require('../models/categories.model');
const { FILM_CATEGORIE_TABLE } = require('../models/film-categorie.model');
const { FILMS_TABLE } = require('../models/film.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(FILM_CATEGORIE_TABLE, {
      categorieId: {
        type: Sequelize.DataTypes.STRING,
        field: 'categorie_id',
        allowNull: false,
        references: {
          model: CATEGORIES_TABLE,
          key: 'id',
        },
      },
      filmId: {
        type: Sequelize.DataTypes.STRING,
        field: 'film_id',
        allowNull: false,
        references: {
          model: FILMS_TABLE,
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(FILM_CATEGORIE_TABLE);
  },
};
