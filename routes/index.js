var express = require('express');
var router = express.Router();
const mailer = require('nodemailer');

var transporter = mailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'pedropereriratestes@gmail.com',
    pass: 'Pedro@0704'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Ponto-Max' });
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
router.get('/autor', function(req, res, next) {
  res.render('autor', { title: 'Autor' });
});

router.post('/send-email', (req, res) => {
  transporter.sendMail({
    from: "pedropereriratestes@gmail.com",
    to: "pedropereriratestes@gmail.com",
    replyTo:req.body.name+" "+"<"+req.body.email+">",
    subject: "Contato com o Desenvolvedor",
    text: req.body.message,
  }).then(message => {
    console.log(message);
  }).catch(err => {
    console.log(err);
  })
  res.redirect('/');
});

module.exports = router;
