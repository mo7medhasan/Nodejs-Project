const express = require('express');
const router = express.Router();

const book = require("../controller/book.controller.js")
// Guest get books
router.get('/', book.listBook);

router.get('/:bookName', book.searchBook);

router.post('/', book.createBook);
router.patch('/:id', book.updateBook);
router.delete('/:id', book.deleteBook);

module.exports = router;