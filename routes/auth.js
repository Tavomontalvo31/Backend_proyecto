const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController')

authRouter.post('/register', authController.registrarUsuario);
authRouter.post('/login', authController.autenticarUsuario);

module.exports = authRouter;