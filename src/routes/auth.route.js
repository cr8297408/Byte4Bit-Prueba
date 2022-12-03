const { Router } = require('express');
const AuthComponent = require('../modules/auth/index');

const router = Router();

/**
  * @swagger
  *  /v1/auth/signIn:
  *      post:
  *          summary: login users
  *          security: [] # No security
  *          tags: ["Auths"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/login'
  *          responses:
  *              200:
  *                  description: login succesfully
  *              401:
  *                  description: user exists
  */
router.post('/signIn', AuthComponent.signIn);

/**
  * @swagger
  *  /v1/auth/signUp:
  *      post:
  *          summary: sign up users
  *          security: [] # No security
  *          tags: ["Auths"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/Auth'
  *          responses:
  *              200:
  *                  description: login succesfully
  *              401:
  *                  description: user exists
  */
router.post('/signUp', AuthComponent.signUp);

/**
  * @swagger
  * tags:
  *  name: Auths
  *  description: endpoints for managing api Auths.
  * components:
  *  schemas:
  *      Auth:
  *          type: object
  *          required:
  *              -email
  *              -name
  *              -password
  *          properties:
  *              id:
  *                  type: string
  *              name:
  *                  type: string
  *              password:
  *                  type: string
  *              email:
  *                  type: string
  *          example:
  *              email: admin1@mail.com
  *              name: testAuth
  *              password: Admin1
  *      login:
  *          type: object
  *          required:
  *              -email
  *              -password
  *          properties:
  *              password:
  *                  type: string
  *              email:
  *                  type: string
  *          example:
  *              email: admin1@mail.com
  *              password: Admin1
  *      forgotPass:
  *          type: object
  *          required:
  *              -email
  *          properties:
  *              email:
  *                  type: string
  *          example:
  *              email: admin1@mail.com
  *      newPass:
  *          type: object
  *          required:
  *              -newPassword
  *              -token
  *          properties:
  *              newPassword:
  *                  type: string
  *              token:
  *                  type: string
  *          example:
  *              newPassword: pass1234
  *              token: mytokensalsk
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
