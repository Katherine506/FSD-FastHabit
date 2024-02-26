const express = require("express");
const Registro = require("../models/registro.model");
const router = express.Router();

router.post("/registrar-usuario", (req, res) => {
    let registroNuevo = new Registro({
        nombre: req.body.nombre,
        email: req.body.email,
        altura: req.body.altura,
        peso: req.body.peso,
        actividad: req.body.actividad,
        genero: req.body.genero,
        nacimiento: req.body.nacimiento,
        pesoIdeal: req.body.pesoIdeal,
        enfermedad: req.body.enfermedad,
        nombreEnfermedad: req.body.nombreEnfermedad,
        descripcion: req.body.descripcion,
        tratamiento: req.body.tratamiento,
        estado: req.body.estado,
        foto: req.body.foto ?? '',
    });

    registroNuevo.save((error) => {
        if (error) {
            res.json({ error });
        } else {
            res.json({
                msj: "El Registro fue registrado correctamente",
            });
        }
    });
});

router.get("/obtener-registros", (req, res) => {
    Registro.find((error, lista) => {
        if (error) {
            res.json({ error });
        } else {
            res.json({
                msj: "Los datos se listaron correctamente",
                lista,
            });
        }
    });
});

router.put("/actualizar-registro", (req, res) => {});

module.exports = router;