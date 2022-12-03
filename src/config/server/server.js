const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const config = require('../env');
const { router } = require('../../routes');
const swaggerDoc = require('../swagger');
// const expressJWT = require("../JWT");

const app = express();

app.use(express.json());
app.use(cors());

const swaggerSpecs = swaggerJsDoc(swaggerDoc);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
// app.use(expressJWT);

const { port } = config;

app.use(router);

app.set('port', port);

module.exports = app;
