const express = require('express');
const router = express.Router();

const users = require("../controller/user.controller.js");
//signup
router.post('/', users.createUser); 

// router.get('/', users.getUsers);
// router.get('/:userId', users.toDoUser); 
router.post('/login', users.authenticate);
router.patch('/:id', users.updateUser);
router.delete('/:id', users.deleteUser);

module.exports = router;