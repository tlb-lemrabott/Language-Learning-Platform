const express = require('express');
const languageController = require('../controllers/languageController');
const authController = require('../controllers/authenticationController');

const languageRoutes = express.Router();

languageRoutes.route('')
    .get(languageController.getAll)
    .post(languageController.addOne);

languageRoutes.route('/:languageId')
    .get(languageController.getById)
    .put(languageController.fullUpdate)
    .patch(languageController.partialUpdate)
    .delete(authController, languageController.deleteById);
    


module.exports = languageRoutes;