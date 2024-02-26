const express = require('express');
const Objetivo = require('../models/objetivos.model');
const router = express.Router();

router.post('/registrar-objetivo', (req, res) => {
    let objetivoNuevo = new Objetivo({
        'tipo': req.body.tipo,
        'cantidad': req.body.cantidad,
        'descripcion': req.body.descripcion
    });

    objetivoNuevo.save((error, objetivoDB) => {
        if (error) {
            res.json({
                error
            });
        } else {
            res.json({
                'msg': 'El objetivo se registró correctamente'
            });
        }
    } );
}   );

router.get('/listar-objetivos', (req, res) => {
    Objetivo.find((error,lista) => {
        if (error) {
            res.json({
                error
            });
        } else {
            res.json({
                'msg': 'Los objetivos se listaron correctamente',
                lista
            });
        }
    } );
}   );

module.exports = router;