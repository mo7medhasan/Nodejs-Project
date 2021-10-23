const express = require('express');
const router = express.Router();

const book = require("../controller/book.controller.js")
// Guest get books
router.get('/', book.listBook);

router.get('/:bookName', book.searchBook);

router.post('/', book.createTask);
router.patch('/:id', book.updateTask);
router.delete('/:id', book.deleteTask);

module.exports = router;