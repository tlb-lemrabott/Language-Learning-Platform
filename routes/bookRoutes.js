const express = require('express');
const bookController = require('../controllers/bookController');
const bookRoutes =  express.Router({ mergeParams: true });


bookRoutes.route('')
    .get(bookController.getAll)
    .put(bookController.addOne);


bookRoutes.route('/:bookId')
    .get(bookController.getById)
    .patch(bookController.update)
    .put(bookController.delete);


module.exports = bookRoutes;