const express = require("express");
const config = require("./config");
const clientes = require("./modulos/clientes/rutas");
const usuarios = require("./modulos/usuarios/rutasUsuarios")


const app = express();
app.use(express.json());

// configuracion
app.set("port", config.app.port);

// rutas
app.use("/api/clientes", clientes);
app.use("/api/usuarios", usuarios)

const alumno={nombre:'Enrique', cal:'8.9', nacionalidad:'MX'}


app.get('/api/alumno', function(req, res){
    res.json(alumno)
})

app.get('/api/alumno/eliminar', function(req, res){
    res.send('Hola eliminaste al alumno')
})




app.use('/api/clientes', function(req, res){
    res.send('hola soy cliente')
})




module.exports = app;
