const User = require('../models/Usuario');
const Ponto = require('../models/Ponto');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const moment = require('moment');

exports.configurarPerfil = function (req, res) {
    res.render('config', {user: req.user});
}

exports.configAdmin = async function (req, res, next) {
    await User.find({}).then(function (user) {
        res.render('configAdmin', {users: user, user: req.user});
    }).catch(next);
};

exports.pontosAdmin = async function (req, res, next) {
    await Ponto.find({}).then(function (pts) {
        res.render('pontoAdmin', {user: req.user, pontos: pts});
    }).catch(next);
};

exports.DELETEregister = function (req, res, next) {
    // 'req.params.id'->devolve-me o parametro id na req
    User.findOneAndDelete({_id: req.params.id}).then(function(user){
        if(!user){
            return res.status(400).json({
                status: 'error',
                error: 'user nao encontrado',
            });
        }else{
            console.log("Registo eliminado com sucesso!");
            res.redirect('/admin/config');
        }
    }).catch(next => {
        return console.log(err)
    });
  };

// PUT user
exports.PUTuser = function (req, res) {
    const { nome, email, pass, image } = req.body;
    let errors = []; // array de erros
    // verificar se todos os campos estão preenchidos
    if (!nome || !email || !pass || !image) {
      errors.push({ msg: 'Please enter all fields' });
    }
    // verificar tamanho da pass
    if (pass.length < 3) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    // Se há erros..
    /*if (errors.length > 0) {
      // render da página com os valores do 'form' + erros
      res.render('config', {
        errors,
        nome,
        email,
        pass,
        image
    });
    } else {*/
    User.findOne({ _id: req.user.id }).then(user => {
        console.log(req.user)
        user.nome = nome
        user.email = email
        if(pass == user.pass && image == ""){
            User.findOneAndUpdate({_id: req.user.id}, user, {upsert: false}).then(users => {
                // flash-message-register-sucess
                req.flash(
                    'success_msg','You are now registered!'
                );
                res.redirect('/config');
            })
            .catch(err => console.log(err));
        }else{
            user.image = image
            // encripta passw e guarda novo_user
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.pass, salt, (err, hash) => {
                    if (err) throw err;
                    user.pass = hash;
                    User.findByIdAndUpdate({_id: req.user.id}, user.nome).then(users => {
                        // flash-message-register-sucess
                        req.flash(
                            'success_msg','You are now registered!'
                        );
                        res.redirect('/config');
                    })
                    .catch(err => console.log(err));
                });
            });
        }
    })
};

// GET login
exports.GETlogin = function (req, res) {
    res.render('login');
};

// POST login
exports.POSTlogin = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

// logout
exports.logout = function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/welcome');
};

// GET Cadastro
exports.GETregister = function (req, res) {
    res.render('register');
};

exports.POSTregister = function (req, res) {
    // os valores de req.body são separados individualmente em
    // variáveis
    const { nome, email, pass, password2, type, image } = req.body;
    let errors = []; // array de erros
    // verificar se todos os campos estão preenchidos
    if (!nome || !email || !pass || !password2 || !type || !image) {
      errors.push({ msg: 'Please enter all fields' });
    }
    
    // verificar se as passes são iguais
    if (pass != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
    // verificar tamanho da pass
    if (pass.length < 3) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
    // Se há erros..
    if (errors.length > 0) {
      // render da página com os valores do 'form' + erros
      res.render('register', {
        errors,
        nome,
        email,
        pass,
        password2,
        type,
        image
    });
    } else {
        // procura User_Duplicado, dps devolve o 'user'
        User.findOne({ email: email }).then(user => {
            // se 'user' já existe renderiza 'register.ejs'com erro
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    nome,
                    email,
                    pass,
                    password2,
                    type,
                    image
                });
            // senão há user_duplicado cria novo_user
            } else {
                const newUser = new User({
                    nome,
                    email,
                    pass,
                    type,
                    image
                });
                // encripta passw e guarda novo_user
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.pass, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.pass = hash;
                        newUser.save().then(user => {
                            // flash-message-register-sucess
                            req.flash(
                                'success_msg','You are now registered!'
                            );
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    }
};

function getDataAtual(){
    var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    var localTime  = moment.utc(date).toDate();

    localTime = moment(localTime).format('YYYY-MM-DD');

    return localTime
}

function getDataParse(data){
    
    return moment(data).format('YYYY-MM-DD')
}

function getHoraParse(data){
    
    return moment(data).format('HH:mm:ss')
}

function getDataHoraAtual(){
    var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    var localTime  = moment.utc(date).toDate();

    localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
    
    return localTime
}

function getDataHoraAtualParse(data, hora){
    
    return dateTime = moment(data + ' ' + hora, 'YYYY-MM-DD HH:mm:ss');
}

// GET pontos
exports.GETpontos = async function (req, res, next) {
    await Ponto.find({"email": req.user.email}).then(function (pts) {
        Ponto.findOne({"email": req.user.email, "data": getDataAtual()}).then(function (ponto) {
            if(ponto){
                res.render('ponto', {user: req.user, data: getDataAtual(), ponto: ponto, pontos: pts});
            }else{
                res.render('ponto', {user: req.user, data: getDataAtual(), ponto: undefined, pontos: pts});
            }
        }).catch(next);
    }).catch(next);
};

// POST pontos
exports.POSTpontos = async function (req, res, next) {
    Ponto.findOne({"email": req.user.email, "data": getDataAtual()}).then(function (ponto) {
        if(ponto===null){
            const newPt = new Ponto({
                email: req.user.email,
                data: getDataAtual(),
                primeira_entrada: getDataHoraAtual(),
            });
            newPt.save().then(function (pt) {
                res.redirect('/pontos');
            }).catch(err => console.log(err));
        }else{
            if(!ponto.primeira_saida){
                Ponto.findOneAndUpdate({_id: ponto.id},{"primeira_saida": getDataHoraAtual()}).then(function (pt) {
                    res.redirect('/pontos');
                }).catch(err => console.log(err));
            }
            else if(!ponto.segunda_entrada){
                Ponto.findOneAndUpdate({_id: ponto.id},{"segunda_entrada": getDataHoraAtual()}).then(function (pt) {
                    res.redirect('/pontos');
                }).catch(err => console.log(err));
            }
            else if(!ponto.segunda_saida){
                Ponto.findOneAndUpdate({_id: ponto.id},{"segunda_saida": getDataHoraAtual()}).then(function (pt) {
                    res.redirect('/pontos');
                }).catch(err => console.log(err));
            }
        }
    }).catch(next);
};

// PUT pontos
exports.pontosUpdateAdmin = function (req, res, next){
    Ponto.findById({_id: req.params.id}).then(function (pt) {
        let primeira_entrada = getHoraParse(pt.primeira_entrada)
        let primeira_saida = getHoraParse(pt.primeira_saida)
        let segunda_entrada = getHoraParse(pt.segunda_entrada)
        let segunda_saida = getHoraParse(pt.segunda_saida)
        res.render('editPontos', {id: pt.id, email: pt.email, data: getDataParse(pt.data), pt1: primeira_entrada, pt2: primeira_saida, pt3: segunda_entrada, pt4: segunda_saida});
    }).catch(next)
};


exports.updatePontoAdmin = function (req, res, next) {
    Ponto.findOneAndUpdate({_id: req.params.id}, {"primeira_entrada": getDataHoraAtualParse(req.body.data, req.body.et1), "primeira_saida": getDataHoraAtualParse(req.body.data, req.body.st1), "segunda_entrada": getDataHoraAtualParse(req.body.data, req.body.et2), "segunda_saida": getDataHoraAtualParse(req.body.data, req.body.st2)}).then(function (pt) {
        res.redirect('/admin/pontos')
    }).catch(next);
};

// DELETE pontos
exports.DELETEpontos = function (req, res, next) {
    // 'req.params.id'->devolve-me o parametro id na req
    Ponto.findOneAndDelete({_id: req.params.id}).then(function(pt){
        if(!pt){
            return res.status(400).json({
                status: 'error',
                error: 'Ponto nao encontrado',
            });
        }else{
            console.log("Ponto eliminado com sucesso!");
            res.redirect('/admin/pontos');
        }
    }).catch(next => {
        return console.log(err)
    });
    
};