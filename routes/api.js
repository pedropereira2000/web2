const Usuario = require('../models/Usuario')

const express = require('express')
const router = express.Router()

const jwt = require("jsonwebtoken")

const passport = require('passport')
const configPassport = require('../outher/jwtAuth')
configPassport(passport)

router.get("/", (req, res) => {
    res.json({auth:true})
})

router.post("/login", (req, res) => {
    let {email, senha} = req.body
    
    let usuario = Usuario.getByLogin(email, senha)
    if (usuario == null) {
      return res.status(401).json({auth: false, message:'Usuário e senha inválidos'})
    }

    const token = jwt.sign({ email: usuario.email}, process.env.CHAVA_JWT, {
      expiresIn: 60
    });
    res.json({auth:true, token: token})
})

let validateJwt = function(req, res, next) {
    const token = req.headers['x-jwt-token']
    if (!token) 
        return res.status(401).json({auth: false, message:'Sem permissão de acesso'})

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(401).send({auth: false, message: "Token inválido!"})
        req.user = Usuario.getByEmail(decoded.email)
        return next()
    })
}

let isAdmin = function(req, res, next) {
    if (!Usuario.isAdmin(req.user)) {
        return res.status(401).json({auth: false, message: "Requer permissao de admin"})
    }
    return next()
}

router.get("/sobre", validateJwt, (req, res) => {
    res.json({auth:true})
})

router.get("/tecnologias", validateJwt, isAdmin, (req, res) => {
    res.json({auth:true})
})

router.get("/autor", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({auth:true})
})

router.get("/configuracao", passport.authenticate('jwt', { session: false }), isAdmin,(req, res) => {
    res.json({auth:true})
})

module.exports = {
    Router: router,
    Passport: passport
}