const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

router.get('/:id', userController.getUser);
router.post('/', userController.createNewUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;