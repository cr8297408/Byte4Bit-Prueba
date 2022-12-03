const { createServer } = require('http');
const app = require('./server');

const database = require('../../database/connection');

const server = createServer(app);
const port = app.get('port');

async function dbConnection() {
  try {
    await database;
    console.log('Database connect');
    server.listen(port, () => {
      console.log('APP LISTENING IN PORT: ', port);
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

dbConnection();

module.exports = server;
