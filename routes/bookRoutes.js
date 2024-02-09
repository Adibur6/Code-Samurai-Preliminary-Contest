const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const bookController = require('../controllers/userController');

// router.get('/', bookController.getAllBooks);
// router.get('/:bookId', bookController.getBook);
// // router.delete('/:bookId', bookController.deleteBook);
// router.put('/:bookId', bookController.updateBook);
// router.post('/', bookController.addBook);

// // Search endpoint
// router.get('/', bookController.searchBooks);
router.post('/', userController.addUser);



module.exports = router;