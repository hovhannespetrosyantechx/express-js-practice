const { readDB, writeDB } = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUserService = async (username, password) => {
  const data = await readDB();
  const existingUser = data.users.find(user => user.username === username)
  if (existingUser) {
    throw new Error('User already exists')
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: data.users.length + 1, username, password: hashedPassword };
  data.users.push(newUser);
  await writeDB(data);
  return { id: newUser.id, username: newUser.username };
};

const loginUserService = async (username, password) => {
  const data = await readDB();
  const user = data.users.find(user => user.username === username);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token };
};

module.exports = {
  registerUserService, loginUserService
};
