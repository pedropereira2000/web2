var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home Page' });
});

/* GET curriculo profissional page. */
router.get('/tecnologias', function(req, res, next) {
  res.render('tecnologias', { title: 'Tecnologias e Ferramentas' });
});

/* GET disciplinas matriculadas page. */
router.get('/sobre', function(req, res, next) {
  res.render('sobre', { title: 'Sobre' });
});

/* GET midias page. */
router.get('/midia', function(req, res, next) {
  res.render('midia', { title: 'Midia' });
});

module.exports = router;
