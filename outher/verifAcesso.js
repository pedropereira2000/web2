const Usuario = require('../models/Usuario')

module.exports = {
    estaLogado: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.session.messages = ["Usuário não autenticado"]
        res.redirect("/login")
    },
    ehAdmin: function(req, res, next) {
        if (req.isAuthenticated() && Usuario.isAdmin(req.user)) {
            return next()
        }

        if (req.isAuthenticated()) {
            req.session.messages = ["Sem autorização"]
            res.redirect("/")
        } else {
            req.session.messages = ["Usuário não autenticado e Sem autorização"]
            res.redirect("/login")
        }
    },
    login: function(req, res, next) {
        let usuario = Usuario.getByEmail("admin@gmail.com")
        req.login(usuario, (err) => {
            if (!err) res.redirect("/configuracao")
            else res.redirect("/login")
        })
    }
}