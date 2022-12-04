const { Router } = require('express');
const { validateJoi } = require('../middlewares/validate-joi');
const CommentController = require('../modules/comments');
const { createCommentSchema } = require('../modules/comments/comment.schema');
// const { createcommentSchema } = require('../modules/comments/comment.schema');

const router = Router();

/**
 * @swagger
 *  /v1/comments:
 *      get:
 *          summary: get all the comments;
 *          tags: ["Comments"]
 *          responses:
 *              200:
 *                  description: get comments successfully
 *                  content:
 *                      application/json:
 *                          squema:
 *                              type: array
 *              401:
 *                  description: error in get comments
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
 *           name: UserId,
 *           in: query,
 *           description: filter by user,
 *             schema: {
 *               type: string,
 *             }
 *         },
 *      ]
 */
router.get('/', CommentController.getAllComments);

/**
 * @swagger
 *  /v1/comments/{id}:
 *      get:
 *          summary: get products of a cart
 *          tags: ["Comments"]
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

router.get('/:id', CommentController.getOneComment);

/**
 * @swagger
 *  /v1/comments/create:
 *      post:
 *          summary: add products to cart
 *          tags: ["Comments"]
 *          requestBody:
 *            required: true
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/comment'
 *          responses:
 *              200:
 *                  description: create succesfully
 *              401:
 *                  description: bad request
 */
router.post('/create', validateJoi(createCommentSchema, 'body'),CommentController.createComment);

/**
 * @swagger
 *  tags:
 *  name: Comments
 *  description: endpoints for managing api comments.
 * components:
 *  schemas:
 *      comment:
 *          type: array
 *          required:
 *              -text
 *              -filmId
 *          properties:
 *              id:
 *                  type: string
 *              text:
 *                  type: string
 *              filmId:
 *                  type: string
 *          example:
 *              text: titanic is very good
 *              filmId: idfasds
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
