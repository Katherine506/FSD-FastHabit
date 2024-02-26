const express = require("express");
const router = express.Router();
const Pesos = require("../models/pesos.models");

router.post("/registrar-pesos", (req, res) => {
    let nuevoPesos = new Pesos({
        peso: req.body.peso,
        fecha: req.body.fecha,
    });

    nuevoPesos.save((error) => {
        if (error) {
            res.json({
                msj: "Ocurrio un error al registrar",
                error,
            });
        } else {
            res.json({
                msj: "Logro registrar el peso ",
            });
        }
    });
});
router.get("/obtener-pesos", (req, res) => {
    Pesos.find((error, lista) => {
        if (error) {
            res.json({
                msj: "No se pudo consultar el listado de usuarios ",
                error,
            });
        } else {
            res.json({
                msj: "usuarios listado correctamente",
                lista,
            });
        }
    });
});

//Ruta para modificar la informacion de un usuario
router.put("/actualizar-pesos", (req, res) => {});

//Ruta para eliminar la informacion de un usuario
router.delete("/eliminar-pesos", (req, res) => {});
module.exports = router;