const express = require('express');
const bookRoutes = require('./bookRoutes');
const languageRoutes = require('./languageRoutes');
const userRoutes = require('./userRoutes');

const routes = express.Router();


routes.use('/languages', languageRoutes);
routes.use('/languages/:languageId/books', bookRoutes);
routes.use('', userRoutes);


module.exports = routes;