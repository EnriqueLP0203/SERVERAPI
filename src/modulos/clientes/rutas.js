const express = require("express");
const router = express.Router();
const controlador = require('./controlador.js')
const respuesta = require('../../red/respuestas.js')


router.get("/", async function(req, res) {
    try {
        const item =await controlador.todos()
        respuesta.success(req, res, 200, item)
    } catch (error) {
        respuesta.error(req, res, 500, error)
        
    } 
    

})

router.get("/:id", async function(req, res) {
    try {
        const item =await controlador.uno(req.params.id)
        respuesta.success(req, res, 200, item)
    } catch (error) {
        respuesta.error(req, res, 500, error)
        
    } 
})


router.get("/update",function(req, res) {
    res.send("Cliente actualizado");
})




router.post('/agregar', function (req, res) {
    const agregar = controlador.agregar(req.body)
respuesta.success(req, res, 200, agregar)
})


module.exports = router;
