'use strict';

const mongoose = require('mongoose');

const schemaAyuno = new mongoose.Schema({
    plan: { type: Number, required: false, unique: false },
    tiempoayuno: { type: Number, required: false },
    // comienzoayuno: { type: Number, required: false },
    // finalayuno: { type: Number, required: false },
    fecha: { type: Date, required: false }
});

module.exports = mongoose.model('Ayuno', schemaAyuno, 'ayunos');