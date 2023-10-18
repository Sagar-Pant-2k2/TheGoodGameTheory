const express = require('express');
const router = express.Router();
const booksController = require('../controller/books')

//endpoint to get all books
router.get('/',booksController.getBooks);

//endpoint to create a new book
router.post('/create',booksController.createBook);

//endpoint to update book using id
router.put('/:id',booksController.updateBook);

//endpoint to delete book using id
router.delete('/',booksController.deleteBook);

module.exports = router