const path = require('path')
require('dotenv').config

var createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Set Cookies
const cookieParser = require("cookie-parser")
app.use(cookieParser())

//Definindo a Sessão
const session = require("express-session")
app.use(session({
    secret: "$%A5803AS&gdfj",
    resave: false,
    saveUninitialized: false
}));

//Atribuindo Passport
const passport = require('passport')
const configPassport = require('./outher/passAuth')
configPassport(passport)
app.use(passport.initialize())
app.use(passport.session())

//Definindo as rotas
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api').Router
const jwtPassport = require('./routes/api').Passport
const loginControl = require('./routes/controleLogin')

app.use(jwtPassport.initialize())

app.use('/', indexRouter)
app.use('/api', apiRouter)

//Definindo rotina padrão para o Login
app.post("/login", loginControl, passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true
}))



//Configurando para permitir envio de email
const mailer = require('nodemailer');
//const EMAIL_USER = process.env.EMAIL_USER;
//const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = mailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: "juana.mueller47@ethereal.email",
      pass: "kjtyXJMnNbmxXBtBxp"
  }
});

/*var transporter = mailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "pedropereriratestes@gmail.com",
    pass: "Pedro@0704"
  }
});*/

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
app.use(function(req, res, next) {
  next(createError(404));
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