const mongoose = require("mongoose");

const schemaPesos = new mongoose.Schema({
    peso: { type: Number, required: true, unique: false },
    fecha: { type: Date, required: true, unique: false },
});

module.exports = mongoose.model("Pesos", schemaPesos, "pesos");