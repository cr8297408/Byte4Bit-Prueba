const { Router } = require('express');
const { validateJoi } = require('../middlewares/validate-joi');
const FilmController = require('../modules/films');
const { createFilmSchema } = require('../modules/films/film.schema');

const router = Router();

/**
 * @swagger
 *  /v1/films:
 *      get:
 *          summary: get all the films;
 *          tags: ["Films"]
 *          responses:
 *              200:
 *                  description: get films successfully
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *              401:
 *                  description: error in get films
 *      parameters: [
 *        {
 *           name: page,
 *           in: query,
 *           description: number of page in pagination,
 *             schema: {
 *               type: string,
 *             }
 *         },
 *        {
 *           name: size,
 *           in: query,
 *           description: number of registers in pagination,
 *             schema: {
 *               type: string,
 *             }
 *         },
 *        {
 *           name: name,
 *           in: query,
 *           description: filter by film name,
 *             schema: {
 *               type: string,
 *             }
 *         },
 *        {
 *           name: gender,
 *           in: query,
 *           description: filter by film gender,
 *             schema: {
 *               type: string,
 *             }
 *         },
 *      ]
 */
router.get('/', FilmController.getAllFilms);

/**
 * @swagger
 *  /v1/films/{id}:
 *      get:
 *          summary: get products of a cart
 *          tags: ["Films"]
 *          responses:
 *              200:
 *                  description: update user successfully
 *              401:
 *                  description: user not authorized to update users
 *          parameters: [
 *           {
 *              name: id,
 *              in: path,
 *              description: id of the cart,
 *              required: true,
 *              schema: {
 *                  type: string,
 *              }
 *           },
 *          ]
 */

router.get('/:id', FilmController.getOneFilm);

/**
 * @swagger
 *  /v1/films/create:
 *      post:
 *          summary: add products to cart
 *          tags: ["Films"]
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/film'
 *          responses:
 *              200:
 *                  description: create succesfully
 *              401:
 *                  description: bad request
 */
router.post('/create', validateJoi(createFilmSchema, 'body'), FilmController.createFilm);

/**
 * @swagger
 * tags:
 *  name: Films
 *  description: endpoints for managing api films.
 * components:
 *  schemas:
 *      film:
 *          type: array
 *          required:
 *              -name
 *              -gender
 *          properties:
 *              id:
 *                  type: string
 *              name:
 *                  type: string
 *              gender:
 *                  type: string
 *              categories:
 *                  type: array
 *          example:
 *              name: titanic
 *              gender: triste
 *              categories: []
 *      Error:
 *          type: object
 *          required:
 *              -status
 *              -message
 *          properties:
 *              status:
 *                  type: integer
 *                  description: HTTP status code
 *                  example: 400
 *              message:
 *                  type: string
 *                  description: Error description
 *                  example: entity no created
 */

module.exports = router;
