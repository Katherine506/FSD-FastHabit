const mongosee = require('mongoose');


let schemaObjetivo = new mongosee.Schema({
    'tipo' : {type: String, required: true, unique: false},
    'cantidad' : {type: Number, required: true, unique: false},
    'descripcion' : {type: String, required: true, unique: false},

});
module.exports = mongosee.model('Objetivo', schemaObjetivo, 'objetivos');