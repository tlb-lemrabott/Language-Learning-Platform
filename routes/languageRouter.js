const express = require('express');
const languageController = require('../controllers/languageController');
const bookController = require('../controllers/bookController');

const routes = express.Router();

routes.route('/languages')
    .get(languageController.getAll)
    .post(languageController.addOne);

routes.route('/languages/:languageName')
    .get(languageController.getByName)
    .put(languageController.update)
    .delete(languageController.delete)


routes.route('/languages/:languageName/books')
    .get(bookController.getAll)
    .put(bookController.addOne);

routes.route('/languages/:languageName/books/:bookName')
    .get(bookController.getByName)
    .patch(bookController.update)
    .put(bookController.delete)





module.exports = routes;