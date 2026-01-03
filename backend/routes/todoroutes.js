const express = require('express');
const todorouter = express.Router();
const todoController = require('../controller/todocontroller');
const authMiddleware = require('../authMiddleware');

todorouter.get('/', authMiddleware, todoController.getAllTodos);
// todorouter.get('/:id', authMiddleware, todoController.getTodo);
todorouter.post('/', authMiddleware, todoController.createNewTodo);
todorouter.put('/:id', authMiddleware, todoController.updateTodo);
todorouter.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = todorouter;