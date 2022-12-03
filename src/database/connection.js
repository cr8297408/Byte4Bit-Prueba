const Sequelize = require('sequelize');
const config = require('../config/env');

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8mb4',
    },
  },
);

module.exports = sequelize;
