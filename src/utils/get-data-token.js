const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/env");

async function getData(bearerHeader) {
  const token = bearerHeader.split(' ')[1];

  const dataToken = jsonwebtoken.verify(token, JWT_SECRET);
  console.log('🚀 ~ file: get-data-token.js:8 ~ getData ~ dataToken', dataToken);

  return dataToken;
}

module.exports = { getData }