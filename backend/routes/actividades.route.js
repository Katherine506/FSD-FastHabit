'use strict';
const express = require('express');
const router = express.Router();
const Actividad = require('../models/actividades.model');


// Ruta para registrar actividad
router.post('/registrar-actividad', (req, res) => {
    let nuevaActividad = new Actividad({
        actividad: req.body.actividad,
        fecha: req.body.fecha,
        horas: req.body.horas,
    });

    nuevaActividad.save((error) => {
        if (error) {
            res.json({
                msj: 'Error',
                error
            });

        } else {
            res.json({
                msj: 'Actividad registrada correctamente'
            });
        }
    });

});

// Ruta para obtener actividades
router.get('/obtener-actividades', (req, res) => {

    Actividad.find((error, lista) => {
        if (error) {
            res.json({
                msj: 'No se pudo consultar la lista de actividades.',
                error
            });
        } else {
            res.json({
                msj: 'Actividades listadas correctamente',
                lista
            });
        }
    });

});

// Ruta para modificar actividad
router.put('/actualizar-actividad', (req, res) => {

});

// Ruta para eliminar actividad

router.delete('/eliminar-actividad', (req, res) => {

});

module.exports = router;