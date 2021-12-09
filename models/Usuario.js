const mongoose = require("mongoose")

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const UsuarioModel = mongoose.model("Usuario", UsuarioSchema)

module.exports = UsuarioModel

/*
{

    newUser(id, name, email){
        let usuario = {id: id, name: name, email: email};
        usuarios=usuario;
    },

    updateUser(name){
        usuarios.name=name;
    },

    listLogado() {
        return usuarios;
    },

    list: async function() {
        const users = await UsuarioModel.find({}).lean()
        return users
    },

    save: async function(nome, email, pass, type, image) {
        const user = new UsuarioModel({
            nome: nome,
            email: email,
            pass: pass,
            type: type,
            image: image
        })
        await user.save()
        return user
    },

    update: async function(id, obj) {
        let user = await UsuarioModel.findById(id)
        if(!user) {
            return false
        }

        Object.keys(obj).forEach(key => user[key] = obj[key])
        await user.save()
        return user
    },

    delete: async function(id) {
        return await UsuarioModel.findByIdAndDelete(id)
    },

    getByLogin: async function(email, pass) {
        let user = await UsuarioModel.find({"email": email, "pass": pass}).lean()
        if (!user) {
            return false
        }
        return user
    },

    isAdmin: async function(email) {
        let user = await UsuarioModel.find({"email": email})
        if(user.type == "admin")
            return nome.type == 'admin'
    },

    getById: async function(id) {
        return await UsuarioModel.findById(id).lean()
    },

    getByOne: async function(id) {
        return await UsuarioModel.findOne({_id: id}).lean()
    },

    toId: async function(token) {
        var out = 0, len = token.length;
        for (pos = 0; pos < len; pos++) {
            out += (token.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return await out % 10000;
    }
}


module.exports = {
    new(name){
        let usuario = {name: name};
        usuarios=usuario;
    },

    update(name){
        usuarios.name=name;
    },

    list(){
        return usuarios;
    },

    getByLogin: function(email, senha) {
        let usuario = email.substr(0, email.indexOf('@'))
        if (usuario != "" && usuario == senha) {
            return {id:this.toId(email), email: email}
        }
        return null;
    },

    getByEmail: function(email) {
        return {id:this.toId(email), email: email}
    },

    isAdmin: function(usuario) {
        let email = usuario.email
        let nome = email.substr(0, email.indexOf('@'))
        return nome == 'admin'
    },

    nameUser: function(usuario, nome) {
        let name = nome
        usuario.nome = nome;
    },

    toId: function(token) {
        var out = 0, len = token.length;
        for (pos = 0; pos < len; pos++) {
            out += (token.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return out % 10000;
    }
}*/