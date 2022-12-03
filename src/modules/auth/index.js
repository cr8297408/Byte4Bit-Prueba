const AuthService = require('./auth.service');

async function signUp(req, res, next) {
  try {
    const Auths = await AuthService.signUp(req.body);
    res.status(200).json(Auths);
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {
  try {
    const { email, password } = req.body;
    const getAuth = await AuthService.signIn({ email, password });
    res.status(201).json(getAuth);
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const forgotPass = await AuthService.forgotPassword(email);
    res.json(forgotPass);
  } catch (error) {
    next(error);
  }
}

async function newPassword(req, res, next) {
  try {
    const { password, token } = req.body;
    const newPass = await AuthService.newPassword(password, token);
    res.json(newPass);
  } catch (error) {
    next(error);
  }
}

// async function getUserAuth(req, res, next) {
//   try {
//     const userLog = await AuthService.getUserLog(req.headers.authorization);

//     res.json(userLog);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// async function updateUser(req, res, next) {
//   try {
//     const userLog = await AuthService.updateUser(req.headers.authorization, req.body);

//     res.json(userLog);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

module.exports = {
  signIn,
  forgotPassword,
  newPassword,
  // getUserAuth,
  // updateUser,
  signUp,
};
