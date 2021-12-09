const express = require ('express');
const router = express.Router();

// importa a propriedade do objeto anónimo de '../config/auth'
const { ensureAuthenticated, ehAdmin, ehAdminPontos } = require('../config/auth');

// importa controlador
const indexController = require('../controller/indexController.js');
const userController = require('../controller/usersController');

// index-route (Home-page)
router.get('/', indexController.home);
router.get('/welcome', indexController.index);
router.get('/tecnologias', indexController.tecnologias)
router.get('/projeto', indexController.projeto)
router.get('/autor', indexController.autor)
router.get('/config', ehAdmin, userController.configurarPerfil)
// Listar pontos batidos
router.get('/pontos', ehAdminPontos, userController.GETpontos);
// create-route
//router.get('/login', indexController.login);
module.exports = router;