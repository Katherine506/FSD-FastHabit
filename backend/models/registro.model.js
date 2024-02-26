const mongoose = require("mongoose");

let schemaRegistro = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    altura: { type: Number, required: true, unique: false },
    peso: { type: Number, required: true, unique: false },
    actividad: { type: String, required: true, unique: false },
    genero: { type: String, required: true, unique: false },
    nacimiento: { type: Date, required: true, unique: false },
    pesoIdeal: { type: Number, required: true, unique: false },
    enfermedad: { type: String, required: true, unique: false },
    nombreEnfermedad: { type: String, required: false, unique: false },
    descripcion: { type: String, required: false, unique: false },
    tratamiento: { type: String, required: false, unique: false },
    estado: { type: String, required: false, unique: false },
    foto: { type: String, required: false, unique: false },
});

//Nombre del modelo, variable del schema, nombre de la coleccion en la BD
module.exports = mongoose.model("Registro", schemaRegistro, "registros");