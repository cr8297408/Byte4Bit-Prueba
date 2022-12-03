const { Router } = require('express');
const { validateJoi } = require('../middlewares/validate-joi');
const AuthComponent = require('../modules/auth/index');
const {
  registerSchema, loginSchema, forgotPassSchema, newPassSchema,
} = require('../modules/auth/validation');

const router = Router();

/**
  * @swagger
  *  /v1/auth/sign-in:
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
router.post('/sign-in', validateJoi(loginSchema, 'body'), AuthComponent.signIn);

/**
  * @swagger
  *  /v1/auth/sign-up:
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
router.post('/sign-up', validateJoi(registerSchema, 'body'), AuthComponent.signUp);

/**
  * @swagger
  *  /v1/auth/forgot-password:
  *      post:
  *          summary: forgot password users
  *          security: [] # No security
  *          tags: ["Auths"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/forgotPass'
  *          responses:
  *              200:
  *                  description: forgot password succesfully
  *              401:
  *                  description: user exists
  */
router.post('/forgot-password', validateJoi(forgotPassSchema, 'body'), AuthComponent.forgotPassword);

/**
  * @swagger
  *  /v1/auth/new-password:
  *      post:
  *          summary: new password users
  *          security: [] # No security
  *          tags: ["Auths"]
  *          requestBody:
  *              required: true
  *              content:
  *                  application/json:
  *                      schema:
  *                          $ref: '#/components/schemas/newPass'
  *          responses:
  *              200:
  *                  description: new password succesfully
  *              401:
  *                  description: user exists
  */
router.post('/new-password', validateJoi(newPassSchema, 'body'), AuthComponent.newPassword);

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
  *              -password
  *              -token
  *          properties:
  *              password:
  *                  type: string
  *              token:
  *                  type: string
  *          example:
  *              password: pass1234
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
