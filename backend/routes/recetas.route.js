// Nos permite crear el servidor y atender a las disferentes peticiones.

const response = require("express");
const express = require("express");
const Receta = require("../models/recetas.model");

// Es la variable que se encargara de recibir,atender las diferentes peticiones y decidira que se ejecutara.
const router = express.Router();

// .post se usa para almacenar datos en la base. Dentro del parentesis se coloca el Endpoint o  punto de llegada

router.post("/registrar-receta", (req, res) => {
    let recetaNueva = new Receta({
        imagen: req.body.imagen,
        nombre: req.body.nombre,
        ingredientes: req.body.ingredientes,
        tipo: req.body.tipo,
        categoria: req.body.categoria,
        preparacion: req.body.preparacion,
    });

    recetaNueva.save((error) => {
        if (error) {
            console.log(error);
            res.json({
                error,
            });
        } else {
            console.log("Registro exitoso", recetaNueva);
            res.json({
                mensaje: "La receta fue registrada correctamente",
            });
        }
    });
});

// En el metodo post la informacion viene dentro del cuerpo de la peticion (req.body)

router.get("/listar-recetas", (req, res) => {
    Receta.find((error, lista) => {
        if (error) {
            res.json({
                msj: "No se pudo consultar las recetas",
                error,
            });
        } else {
            res.json({
                mensaje: "Las recetas se listaron correctamente",
                lista,
            });
        }
    });
});

router.get("/filtrar-recetas", (req, res) => {
    let query = {};
    if (req.query.tipo) {
        query.tipo = req.query.tipo;
    }
    if (req.query.categoria) {
        query.categoria = req.query.categoria;
    }

    Receta.find(query, (error, lista) => {
        if (error) {
            res.json({
                msj: "No se pudo filtrar las recetas",
                error,
            });
        } else {
            res.json({
                mensaje: "Las recetas se filtraron correctamente",
                lista,
            });
        }
    });
});
module.exports = router;