const express = require('express');
const userrouter = express.Router();
const userController = require('../controller/usercontroller');

// userrouter.get('/:email', userController.getUser);
userrouter.post('/signup', userController.createNewUser);
userrouter.post('/login', userController.loginUser);
// userrouter.put('/:email', userController.updateUser);
// userrouter.delete('/:email', userController.deleteUser);

module.exports = userrouter;