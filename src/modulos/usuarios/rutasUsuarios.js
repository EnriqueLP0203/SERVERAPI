const express = require("express");
const router = express.Router();

router.get("/",function(req, res) {
    res.send("Hola soy ruta usuario");
})

router.get("/update",function(req, res) {
    res.send("Usuario actualizado");
})


module.exports = router;
