const { config } = require('dotenv');

config();
const development = {
  port: process.env.PORT,

  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_PASS_SECRET: process.env.JWT_PASS_SECRET,

  URL_SWAGGER: process.env.URL_SWAGGER,

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
};

module.exports = development;
