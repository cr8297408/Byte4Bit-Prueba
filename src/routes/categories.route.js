const { Router } = require('express');
const { validateJoi } = require('../middlewares/validate-joi');
const CategorieController = require('../modules/categories');
const { createCategorieSchema } = require('../modules/categories/categorie.schema');

const router = Router();

/**
 * @swagger
 *  /v1/categories:
 *      get:
 *          summary: get all the categories;
 *          tags: ["Categories"]
 *          responses:
 *              200:
 *                  description: get categories successfully
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *              401:
 *                  description: error in get categories
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
 *           description: filter by categorie name,
 *             schema: {
 *               type: string,
 *             }
 *         },
 *      ]
 */
router.get('/', CategorieController.getAllCategories);

/**
 * @swagger
 *  /v1/categories/{id}:
 *      get:
 *          summary: get products of a cart
 *          tags: ["Categories"]
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

router.get('/:id', CategorieController.getOneCategorie);

/**
 * @swagger
 *  /v1/categories/create:
 *      post:
 *          summary: add products to cart
 *          tags: ["Categories"]
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/categorie'
 *          responses:
 *              200:
 *                  description: create succesfully
 *              401:
 *                  description: bad request
 */
router.post('/create', validateJoi(createCategorieSchema, 'body'), CategorieController.createCategorie);

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: endpoints for managing api categories.
 * components:
 *  schemas:
 *      categorie:
 *          type: array
 *          required:
 *              -name
 *              -gender
 *          properties:
 *              id:
 *                  type: string
 *              name:
 *                  type: string
 *          example:
 *              name: titanic
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
