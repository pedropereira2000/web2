const express = require ('express');
const router = express.Router();

// importa controlador
const usersController = require('../controller/usersController');
const { ensureAuthenticated, ehAdmin } = require('../config/auth');
const { route } = require('.');

// Login Page
router.get('/login', usersController.GETlogin);

// Efetuar login
router.post('/login', usersController.POSTlogin);

// Efetuar logout
router.get('/logout', usersController.logout);

// Cadastro Page
router.get('/cadastro', usersController.GETregister);

// Alterar cadastro
router.post('/config', usersController.PUTuser);

// Registra no BD
router.post('/register', usersController.POSTregister);

// Cadastra novo ponto no BD
router.post('/pontos', ensureAuthenticated, usersController.POSTpontos);

// Atualiza o ponto no BD
//router.post('/pontos/:id', ensureAuthenticated, usersController.PUTponto);

// Deleta o ponto no BD
//router.get('/pontos/:id', ensureAuthenticated, usersController.DELETEponto)

module.exports = router;