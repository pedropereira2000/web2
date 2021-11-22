const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const Usuario = require('../models/Usuario')

require('dotenv').config()

module.exports = function(passport) {

    var jwtOp = {}
    jwtOp.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOp.secretOrKey = process.env.CHAVA_JWT;

    passport.use(new JwtStrategy(jwtOp, function(jwt_payload, done) {
        let usuario = Usuario.getByEmail(jwt_payload.email)
        if (usuario == null)
            return done(null, false)
        return done(null, usuario)
    }));
}