const { UUIDV4 } = require('sequelize');
const { FILMS_TABLE } = require('../models/film.model');
const { USERS_TABLE } = require('../models/user.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(FILMS_TABLE, {
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING(25),
        allowNull: false,
      },
      gender: {
        type: Sequelize.DataTypes.STRING(15),
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.DataTypes.STRING,
        field: 'created_by',
        allowNull: false,
        references: {
          model: USERS_TABLE,
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
    await queryInterface.dropTable(FILMS_TABLE);
  },
};
