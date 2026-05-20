const { readDB, writeDB } = require('../config/db.js');

const getTodosService = async (userId, page, limit) => {
  const data = await readDB();
  const userTodos = data.todos.filter(todo => todo.userId === userId);
  const start = (page - 1) * limit;
  return { todos: userTodos.slice(start, start + limit), total: userTodos.length, page, limit };
};

const createTodoService = async (userId, title) => {
  const data = await readDB();
  const newTodo = { id: data.todos.length + 1, userId, title, completed: false };
  data.todos.push(newTodo);
  await writeDB(data);
  return newTodo;
};

const updateTodoService = async (userId, todoId, updates) => {
  const data = await readDB();
  const todo = data.todos.find(t => t.id === todoId);
  if (!todo) throw new Error('Todo not found');
  if (todo.userId !== userId) throw new Error('Forbidden');
  Object.assign(todo, updates);
  await writeDB(data);
  return todo;
};

const deleteTodoService = async (userId, todoId) => {
  const data = await readDB();
  const index = data.todos.findIndex(t => t.id === todoId);
  if (index === -1) throw new Error('Todo not found');
  if (data.todos[index].userId !== userId) throw new Error('Forbidden');
  data.todos.splice(index, 1);
  await writeDB(data);
};

module.exports = { getTodosService, createTodoService, updateTodoService, deleteTodoService };