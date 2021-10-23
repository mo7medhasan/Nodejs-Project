const express = require('express');
const router = express.Router();

const users = require('../controller/user');


router.post('/', users.signUp)
router.post('/login', users.login)
//create
router.get('/', users.list)//
router.delete('/:id', users.delete)
router.put('/:id', users.update)

// router.get('/:limit', users.list)




module.exports = router