const mongoose = require("mongoose")

const PontoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    primeira_entrada: {
        type: Date,
        required: true
    },
    primeira_saida: {
        type: Date,
        required: false
    },
    segunda_entrada: {
        type: Date,
        required: false
    },
    segunda_saida: {
        type: Date,
        required: false
    }
})

const PontoModel = mongoose.model("Ponto", PontoSchema)

module.exports = PontoModel