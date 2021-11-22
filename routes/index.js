const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario')

const acesso = require('../outher/verifAcesso')

//const session = require("express-session");
//const cookieParser = require('cookie-parser');
//const jwt = require("jsonwebtoken")
require('dotenv');

// GET home page.
router.get('/', function(req, res, next) { 
  let error = ""
  if (req.session.messages != undefined) {
    error = req.session.messages.pop()
  }
  console.log(Usuario.list())
  names = Usuario.list()
  if(typeof req.user !== 'undefined' && names.name == null)
    Usuario.new(req.user.email)
  else if(typeof req.user === 'undefined')
    Usuario.new(undefined)
  res.render("home", {
      title: 'Ponto-Max', 
      error: error,
      usuario: Usuario.list()
  })
});
// GET login page. 
router.get('/login', function(req, res, next) {
  let error = ""
  if (req.session.messages) {
    error = req.session.messages.pop()
  }
  res.render('login', { title: 'Login',error:error, email: req.cookies.email});
});

// GET tecnologia utilizadas page. 
router.get('/tecnologias', function(req, res, next) {
  let erro = ""
  if (req.session.messages != undefined) {
    erro = req.session.messages.pop()
  }
  res.render('tecnologias', { title: 'Tecnologias e Ferramentas', usuario: Usuario.list(), erro: erro });
});

// GET Descrição do projeto page. 
router.get('/sobre', function(req, res, next) {
  let erro = ""
  if (req.session.messages != undefined) {
    erro = req.session.messages.pop()
  }
  res.render('sobre', { title: 'Sobre', usuario: Usuario.list(), erro:erro});
});

// GET Informações sobre o autor do projeto page.
router.get('/autor', function(req, res, next) {
  let erro = ""
  if (req.session.messages != undefined) {
    erro = req.session.messages.pop()
  }
  res.render('autor', { title: 'Autor', usuario: Usuario.list() , erro: erro});
});

// GET Configurações da página 
router.get('/configuracao', acesso.ehAdmin, (req, res, next) =>  {
  let erro = ""
  if (req.session.messages != undefined) {
    erro = req.session.messages.pop()
  }
  res.render('configuracao', { title: 'Configurações', usuario: Usuario.list(), erro:erro});
});

router.post("/configuracao", (req, res) => {
  Usuario.update(req.body.name)
  res.redirect('/configuracao')
})

// GET para realizar Logout do usuário
router.get("/logout", (req, res) => {
  req.logout()
  res.clearCookie("name")
  res.redirect("/")
})


module.exports = router;
