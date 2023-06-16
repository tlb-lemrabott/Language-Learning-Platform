const express = require('express');
const userController = require('../controllers/userController');

const userRoutes = express.Router();


userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);


module.exports = userRoutes;