const User = require('../models/Usuario');

exports.test = function (req, res) {
    res.send('Olá! Teste ao Controller');
};

exports.validaLogin = function (req, res) {
    let {email, senha} = req.body
    
    let usuario = User.findOne({"email": email, "pass": senha})
    if (usuario == null) {
      return res.status(401).json({auth: false, message:'Usuário e senha inválidos'})
    }
    res.redirect('/')
}

// TODO: listar todos usuarios de interesse da BD
exports.details = function (req, res) {
    User.find({}).then(function(user){
        res.send(user);
    });
};

exports.detailsUser = function (req, res, next) {
    User.findOne({"email": req.query.email}).then(function (user) {
        res.render('user', {user: user});
    }).catch(next);
};

// TODO: atualizar ponto de interesse
exports.update = function (req, res, next) {
    User.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
      User.findOne({_id: req.params.id}).then(function(user){
        res.send(user);
      });
    }).catch(next);
 };

// TODO: apagar ponto de interesse
exports.delete = function (req, res, next) {
    // apaga ‘pi’ da BD, depois, devolve o ‘pi’ apagado ao cliente
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    }).catch(next);
};

exports.create = function (req, res, next) {
    const {nome, email, pass, type, image} = req.body;
    let usuario = {
        nome: nome,
        email: email,
        pass: pass,
        type: type,
        image: image
    };

    User.create(usuario).then(function(user){
        res.redirect('/login');
    }).catch(next);
  };