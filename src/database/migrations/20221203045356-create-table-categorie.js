const { UUIDV4 } = require('sequelize');
const { CATEGORIES_TABLE } = require('../models/categories.model');
const { USERS_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      CATEGORIES_TABLE,
      {
        id: {
          type: Sequelize.DataTypes.STRING,
          defaultValue: UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING(12),
          allowNull: false,
        },
        createdBy: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          field: 'created_by',
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
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORIES_TABLE);
  },
};
