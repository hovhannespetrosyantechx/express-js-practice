const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

// GET ALL USERS
const getUsers = (req, res) => {

  res.status(200).json({
    success: true,
    data: users
  });

};

// GET USER BY ID
const getUserById = (req, res, next) => {

  const userId = Number(req.params.id);

  const user = users.find(user => user.id === userId);

  if (!user) {

    const error = new Error('User not found');

    error.statusCode = 404;

    return next(error);
  }

  res.status(200).json({
    success: true,
    data: user
  });

};

// CREATE USER
const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {

    return res.status(400).json({
      success: false,
      message: 'Name is required'
    });

  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });

};

module.exports = {
  getUsers,
  getUserById,
  createUser
};
