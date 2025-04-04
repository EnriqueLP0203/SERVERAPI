const express = require("express");
const router = express.Router();
const controlador = require("./controlador");
const respuesta = require("../../red/respuestas");



router.get("/", async function (req, res) {
    try {
        const users = await controlador.todos();
        respuesta.success(req, res, 200, users);
    } catch (error) {
        respuesta.error(req, res, 500, "Error al obtener usuarios", error);
    }
    }
);

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const user = await controlador.uno(id);
    
    if (user && user.length > 0) {
      respuesta.success(req, res, 200, user);
    } else {
      respuesta.error(req, res, 404, "Usuario no encontrado");
    }
  } catch (error) {
    respuesta.error(req, res, 500, "Error al obtener usuario", error);
  }
}
);

  router.post('/eliminar', async function (req, res) {
    try {
      const item = await controlador.eliminar(req.body);
      respuesta.success(req, res, 200, 'dato eliminado');
    } catch (error) {
      respuesta.error(req, res, 500, 'Error al obtener datos', error);
    }
  })


router.post("/login", async function (req, res) {
  try {
    const { correo, contraseña } = req.body;
    const user = await controlador.login(correo, contraseña);
    
    if (user && user.length > 0) {
      respuesta.success(req, res, 200, "ESTÁS LOGUEADO");
    } else {
      respuesta.error(req, res, 400, "Credenciales incorrectas");
    }
  } catch (error) {
    respuesta.error(req, res, 500, "Error al intentar hacer login", error);
  }
});

router.post("/registro", async function (req, res) {
  try {
    const user = await controlador.registrar(req.body);
    respuesta.success(req, res, 200, "Usuario registrado");
  } catch (error) {
    respuesta.error(req, res, 500, "Error al registrar usuario", error);
  }
});

module.exports = router;
