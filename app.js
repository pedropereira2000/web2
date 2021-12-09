const path = require('path')
const dotenv = require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejsLint = require('ejs-lint');

//Set Cookies
const cookieParser = require("cookie-parser")
//Definindo a Sessão
//Atribuindo Passport
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const mongoose = require('mongoose');
// Ligar á B.D.: 'test'->user da BD, ´nnn´->pass
mongoose.connect(process.env.MONGODB_URI);
// Confirma ligação na consola
mongoose.connection.on('connected', function () {
  console.log('Connected to Database '+'test');
});
// Mensagem de Erro
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

//=======================>>>


const app = express();

app.use(expressLayouts);

// view engine setup
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Set Cookies
app.use(cookieParser())

//Definindo a Sessão
app.use(session({
  secret: "$%A5803AS&gdfj",
  resave: true,
  saveUninitialized: true
}));

//Atribuindo Passport
require('./config/passport')(passport);
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

// Global variables middleware
app.use(function(req, res, next) {
  // ‘res.locals’->é a forma de criar variáveis ou funções globais
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // passport tem as suas próprias flash-msgs
  // que passa em ‘flash(‘error’)’, assim faço overwrite
  res.locals.error = req.flash('error');
  next();
});

const users = require('./routes/user');
const index = require('./routes/index');
const admin = require('./routes/admin');
app.use('/users', users);
app.use('/', index);
app.use('/admin', admin);


//Configurando para permitir envio de email
const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS
  }
});

// POST para envio de email
app.post('/send-email', (req, res) => {
  transporter.sendMail({
    from: "juana.mueller47@ethereal.email",
    to: "juana.mueller47@ethereal.email",
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

// catch 404 and forward to error handler
app.use(function(err, req, res, next){
  console.log(err);
  // ‘res.status(422)’->muda o status
  res.status(422).send({error: err.message});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log("Running...")
})