'use strict';
const express = require('express');
const router = express.Router();
const Ayuno = require('../models/ayunos.model');


// Ruta para registrar ayuno
router.post('/registrar-ayuno', (req, res) => {
    let nuevoAyuno = new Ayuno({
        plan: req.body.plan,
        tiempoayuno: req.body.tiempoayuno,
        // comienzoayuno: req.body.comienzoayuno,
        // finalayuno: req.body.finalayuno,
        fecha: req.body.fecha
    });

    nuevoAyuno.save((error) => {
        if (error) {
            res.json({
                msj: 'Error al registrar ayuno',
                error
            });

        } else {
            res.json({
                msj: 'Ayuno registrado correctamente'
            });
        }
    });

});

// Ruta para obtener actividades
router.get('/obtener-ayunos', (req, res) => {

    Ayuno.find((error, lista) => {
        if (error) {
            res.json({
                msj: 'No se pudo consltar la lista de ayunos',
                error
            });
        } else {
            res.json({
                msj: 'Ayunos listados correctamente',
                lista
            });
        }
    });

});

module.exports = router;