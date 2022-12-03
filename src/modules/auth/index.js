const AuthService = require('./service');

async function signUp(req, res) {
  try {
    const Auths = await AuthService.signUp(req.body);
    res.status(200).json(Auths);
  } catch (error) {
    res.json(error.message);
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const getAuth = await AuthService.signIn({ email, password });
    res.status(201).json(getAuth);
  } catch (error) {
    res.json(error.message);
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const forgotPass = await AuthService.forgotPassword(email);
    res.json(forgotPass);
  } catch (error) {
    res.json(error.message);
  }
}

async function newPassword(req, res) {
  try {
    const { password, token } = req.body;
    const newPass = await AuthService.newPassword(password, token);
    res.json(newPass);
  } catch (error) {
    res.json(error.message);
  }
}

// async function getUserAuth(req, res) {
//   try {
//     const userLog = await AuthService.getUserLog(req.headers.authorization);

//     res.json(userLog);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// async function updateUser(req, res) {
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
