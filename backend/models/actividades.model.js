'use strict';

const mongoose = require('mongoose');

const schemaActividades = new mongoose.Schema({
    actividad: { type: String, required: true, unique: false },
    horas: { type: Number, required: true },
    fecha: { type: Date, required: true }
});

module.exports = mongoose.model('Actividades', schemaActividades, 'actividades');