const { COMMENTS_TABLE } = require('../models/comment.model');
const { FILM_COMMENTS_TABLE } = require('../models/film-comments.model');
const { FILMS_TABLE } = require('../models/film.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      FILM_COMMENTS_TABLE,
      {
        commentId: {
          type: Sequelize.DataTypes.STRING,
          field: 'comment_id',
          allowNull: false,
          references: {
            model: COMMENTS_TABLE,
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
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(FILM_COMMENTS_TABLE);
  },
};
