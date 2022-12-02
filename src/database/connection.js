const { Sequelize } = require('sequelize');
const config = require('../config/env');

const options = {
  dialect: 'postgres',
  dialectOptions: {
    application_name: 'watch',
    schema: 'public',
  },
  logging: !config.isProd,
};

if (config.isProd) {
  /* More about dialectOptions: https://sequelize.org/docs/v6/other-topics/dialect-specific-things/ Search: PostgreSQL */
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const database = new Sequelize(config.dbUrl, options);
module.exports = {
  database,
};
