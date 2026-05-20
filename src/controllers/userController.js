const { registerUserService, loginUserService } = require('../services/userService');

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await registerUserService(username, password);
    return res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = await loginUserService(username, password);
    return res.status(200).json({ message: 'Login successful', ...data });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
