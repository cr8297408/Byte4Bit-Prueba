const jsonwebtoken = require('jsonwebtoken');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { User } = require('../../database/models/user.model');
const { sendMail } = require('../../utils/send-email');
const { template } = require('../../utils/templates');
const config = require('../../config/env');

const AuthService = {

  async signUp(body) {
    const validateUser = await User.findOne({
      where: {
        [Op.or]: {
          name: body.name,
          email: body.email,
        },
      },
    });

    if (validateUser) {
      throw boom.badRequest('usuario o email en uso...');
    }
    const dataUser = {
      email: body.email,
      name: body.name,
      password: bcrypt.hashSync(body.password, 10),
    };
    const createdAuth = await User.create(dataUser);

    const textEmail = 'It is a great honor for us that you choose us to share wonderful movies at this time.';
    const infoEmail = {
      from: 'Incredible Watch',
      emailFrom: config.MAIL_USER,
      emailTo: body.email,
      subject: 'Register in Incredible Watch',
      body: template(body.name, textEmail),
    };

    await sendMail(infoEmail);
    return createdAuth;
  },

  async signIn(body) {
    const user = await User.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw boom.badRequest('credenciales incorrectas');
    }
    const result = bcrypt.compareSync(body.password, user.password);
    if (!result) {
      throw boom.badRequest('credenciales incorrectas');
    }
    const dataToken = {
      id: user.id
    };

    const token = jsonwebtoken.sign(dataToken, config.JWT_SECRET);
    return token;
  },

  async forgotPassword(email) {
    const message = 'revisa tu email para cambiar la contraseña';

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    const dataToken = {
      id: user.id,
    };

    const token = jsonwebtoken.sign({ dataToken }, config.JWT_PASS_SECRET);

    user.update({
      recovery: token,
    });

    const textEmail = `your recovery token is: ${token}`;
    const emailInfo = {
      emailFrom: config.MAIL_USER,
      emailTo: user.email,
      subject: 'recuperación contraseña',
      body: template(user.name, textEmail),
    };

    await sendMail(emailInfo);

    return message;
  },

  async newPassword(password, bearerHeader) {
    const validateToken = jsonwebtoken.decode(bearerHeader, config.JWT_PASS_SECRET);

    if (validateToken) {
      const user = await User.findOne({
        where: {
          id: validateToken.dataToken.id,
        },
      });

      if (user.recovery !== bearerHeader) {
        throw boom.unauthorized('no authorized');
      }

      const newpass = bcrypt.hashSync(password, 10);

      const changePassword = await user.update({
        password: newpass,
      });

      return changePassword;
    }
    return 'token no valid';
  },

  // async getUserLog(bearerHeader) {
  //   const user = await getUser(bearerHeader);
  //   if (!user) {
  //     throw new Error('token invalido...');
  //   }
  //   return user;
  // },

  // async updateUser(bearerHeader, body) {
  //   const validateBody = AuthValidation.updateAuth(body);
  //   if (validateBody.error) {
  //     throw new Error(validateBody.error);
  //   }

  //   const user = await getUser(bearerHeader);
  //   const newUser = await User.update(
  //     {
  //       name: body.name,
  //       email: body.email,
  //       updatedBy: user.id,
  //     },
  //     { where: { id: user.id } },
  //   );

  //   return newUser;
  // },
};

module.exports = AuthService;
