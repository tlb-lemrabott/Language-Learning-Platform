const express = require('express');
const bookRoutes = require('./bookRoutes');
const languageRoutes = require('./languageRoutes');

const routes = express.Router();

routes.use('/languages', languageRoutes);
routes.use('/languages/:languageId/books', bookRoutes);


module.exports = routes;