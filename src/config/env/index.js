const { config } = require('dotenv');

config();
const development = {
  port: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  URL_SWAGGER: process.env.URL_SWAGGER,
};

module.exports = development;
