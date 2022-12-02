const http = require("http");
const app = require("./server");

const server = http.createServer(app);
const db = require("../connection/connectBd");

const port = app.get("port");

async function dbConnection() {
  try {
    await db.sequelize.sync();
    console.log("Database connect");
    require("../socket.io");
    server.listen(port, () => {
      console.log("APP LISTENING IN PORT: ", port);
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

dbConnection();

module.exports = server;
