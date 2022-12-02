const { config } = require('dotenv');

config();
const development = {
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL,
};

module.exports = development;
