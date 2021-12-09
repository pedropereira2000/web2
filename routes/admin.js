const express = require ('express');
const router = express.Router();

// importa a propriedade do objeto anónimo de '../config/auth'
const { ensureAuthenticated, ehAdmin, logAdmin } = require('../config/auth');

// importa controlador
const indexController = require('../controller/indexController.js');
const userController = require('../controller/usersController');

// index-route (Home-page)
router.get('/config', logAdmin, userController.configAdmin);

router.get('/pontos', logAdmin, userController.pontosAdmin);

router.get('/pontos/update/:id', logAdmin, userController.pontosUpdateAdmin)

router.post('/pontos/update/:id', logAdmin, userController.updatePontoAdmin)

router.get('/pontos/delete/:id', logAdmin, userController.DELETEpontos);

// Delete no BD
router.get('/delete/:id', logAdmin, userController.DELETEregister);

// create-route
//router.get('/login', indexController.login);
module.exports = router;