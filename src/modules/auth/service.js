const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { Op } = require('sequelize');
const { User } = require('../../database/models/user.model');
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
      throw new Error('usuario o email en uso...');
    }
    const dataUser = {
      email: body.email,
      name: body.name,
      password: bcrypt.hashSync(body.password, 10),
    };
    const createdAuth = await User.create(dataUser);

    return createdAuth;
  },

  async signIn(body) {
    const user = await User.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new Error('credenciales incorrectas');
    }
    const result = bcrypt.compareSync(body.password, user.password);
    if (!result) {
      throw new Error('credenciales incorrectas');
    }
    const dataToken = {
      id: user.id,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      typeUser: user.typeUser,
    };

    const token = jsonwebtoken.sign({ dataToken }, config.JWT_SECRET);
    return token;
  },

  // async forgotPassword(email) {
  //   const message = 'revisa tu email para cambiar la contraseña';

  //   const user = await User.findOne({
  //     where: { email },
  //   });

  //   if (!user) {
  //     throw new Error(message);
  //   }

  //   const dataToken = {
  //     id: user.id,
  //   };

  //   const token = jsonwebtoken.sign({ dataToken }, config.JWT_PASS_SECRET);

  //   const emailFrom = config.MAIL_USER;
  //   const emailTo = user.email;
  //   const subject = 'recuperación contraseña';
  //   const textPrincipal = `Tu token para cambio de contraseña es: ${token}`;

  //   await sendMail('syscomp', emailFrom, emailTo, subject, textPrincipal);

  //   return message;
  // },

  // async newPassword(newPassword, bearerHeader) {
  //   const validateToken = jsonwebtoken.decode(bearerHeader, config.JWT_PASS_SECRET);

  //   if (validateToken) {
  //     const newpass = bcrypt.hashSync(newPassword, 10);

  //     const changePassword = await User.update({
  //       password: newpass,
  //     }, {
  //       where: { id: validateToken.dataToken.id },
  //     });

  //     return changePassword;
  //   }
  //   return 'token no valid';
  // },

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
