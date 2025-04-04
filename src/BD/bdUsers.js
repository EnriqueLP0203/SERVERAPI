const mysql = require("mysql");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

function conMysql() {
  conexion = mysql.createConnection(dbconfig);
  conexion.connect((err) => {
    if (err) {
      console.log("[BD err]", err);
      setTimeout(conMysql, 200);
    } else {
      console.log("BD conectada");
    }
  });
  conexion.on("error", (err) => {
    console.log("[BD error]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      conMysql();
    } else {
      throw err;
    }
  });
}

conMysql();

// Función para obtener todos los usuarios
function todos(TABLA) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${TABLA};`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

// Función para obtener un solo usuario
function uno(TABLA, id) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${TABLA} WHERE id = ?;`, [id], (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

// Función para realizar un login
function login(TABLA, correo, contraseña) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${TABLA} WHERE correo = ? AND contraseña = ?;`,
      [correo, contraseña],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

// Función para insertar un nuevo usuario
function insertar(TABLA, data) {
  return new Promise((resolve, reject) => {
    conexion.query(`INSERT INTO ${TABLA} SET ?`, data, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

// Función para actualizar un usuario
function actualizar(TABLA, data) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `UPDATE ${TABLA} SET ? WHERE id = ?`,
      [data, data.id],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

// Función para agregar un usuario (insertar o actualizar)
function agregar(TABLA, data) {
  if (data && data.id == 0) {
    return insertar(TABLA, data);
  } else {
    return actualizar(TABLA, data);
  }
}

// Función para eliminar un usuario
function eliminar(TABLA, data) {
  return new Promise((resolve, reject) => {
    conexion.query(`DELETE FROM ${TABLA} WHERE id = ?`, [data.id], (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

module.exports = {
  todos,
  uno,
  login,
  agregar,
  eliminar,
};
