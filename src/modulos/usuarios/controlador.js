const bdUsers = require("../../BD/bdUsers");

const TABLA = "usuarios";


// Función para obtener todos los usuarios
function todos() {
  return bdUsers.todos(TABLA);
}

// Función para obtener un solo usuario
function uno(id) {
  return bdUsers.uno(TABLA, id);
}

//Funcion para eliminar un usuario
function eliminar(data) {
  return bdUsers.eliminar(TABLA, data);
}

// Función para login
function login(correo, contraseña) {
  return bdUsers.login(TABLA, correo, contraseña);
}

// Función para registrar un nuevo usuario
function registrar(data) {
  return bdUsers.agregar(TABLA, data);
}

module.exports = {
  login,
  registrar,
  todos,
  uno,
  eliminar,
};
