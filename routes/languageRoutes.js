const express = require('express');
const languageController = require('../controllers/languageController');

const languageRoutes = express.Router();

languageRoutes.route('')
    .get(languageController.getAll)
    .post(languageController.addOne);

languageRoutes.route('/:languageId')
    .get(languageController.getById)
    .put(languageController.fullUpdate)
    .patch(languageController.partialUpdate)
    .delete(languageController.deleteById);
    


module.exports = languageRoutes;