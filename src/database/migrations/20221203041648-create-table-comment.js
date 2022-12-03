const { UUIDV4 } = require('sequelize');
const { USERS_TABLE } = require('../models/user.model');
const { COMMENTS_TABLE } = require('../models/comment.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(COMMENTS_TABLE, {
      id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: Sequelize.DataTypes.TEXT,
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(COMMENTS_TABLE);
  },
};
