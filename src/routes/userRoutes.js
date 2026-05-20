const express = require('express');

const {
  getUsers,
  getUserById,
  createUser
} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// GET
//api/users/:10

//POST
//api/users

// GET ALL USERS
router.get('/', getUsers);

// GET USER BY ID
router.get('/:id', getUserById);

// CREATE USER
router.post('/', authMiddleware, createUser);

module.exports = router;
