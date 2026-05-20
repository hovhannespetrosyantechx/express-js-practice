const { getTodosService, createTodoService, updateTodoService, deleteTodoService } = require('../services/todoService');

const getTodos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getTodosService(req.user.id, page, limit);
    res.status(200).json(data);
  } catch (error) { next(error); }
};

const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    const todo = await createTodoService(req.user.id, title);
    res.status(201).json({ message: 'Todo created', todo });
  } catch (error) { next(error); }
};

const updateTodo = async (req, res, next) => {
  try {
    const todo = await updateTodoService(req.user.id, parseInt(req.params.id), req.body);
    res.status(200).json({ message: 'Todo updated', todo });
  } catch (error) { next(error); }
};

const deleteTodo = async (req, res, next) => {
  try {
    await deleteTodoService(req.user.id, parseInt(req.params.id));
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) { next(error); }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
