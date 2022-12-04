const { expressjwt: jwt } = require('express-jwt');

const config = require('../../config/env');

const { JWT_SECRET } = config;
const { JWT_ALGORITHMS } = config;

const expressJWT = jwt({
  secret: JWT_SECRET,
  algorithms: [JWT_ALGORITHMS],
})
.unless({
  path: [
    '/v1/auth/sign-up',
    '/v1/auth/sign-in',
    '/api-docs',
    '/v1/auth/forgot-password',
    '/v1/auth/new-password',
    '/',
  ],
});

module.exports = { expressJWT };
