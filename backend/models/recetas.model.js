//El archivo model nos permite definir la estructura de la base de datos.
// Nos permite conectarnos con MongoDB
const mongoose = require("mongoose");

// Variable conocido como schema. Es  el esqueleto del codigo.

let schemaReceta = new mongoose.Schema({
    imagen: { type: String, required: false, unique: false },
    nombre: { type: String, required: true, unique: false },
    ingredientes: { type: String, required: true, unique: false },
    tipo: { type: String, required: true, unique: false },
    categoria: { type: String, required: true, unique: false },
    preparacion: { type: String, required: true, unique: false },
});

//(Nombre del modelo,variable del esquema,nombre de la coleccion de la base de datos)
module.exports = mongoose.model("Receta", schemaReceta, "recetas");