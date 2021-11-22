let usuarios = null;
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
}