const config = require("../config");
const mysql = require("mysql");

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

function todos(TABLA) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${TABLA};`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function uno(TABLA, id) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT *FROM ${TABLA} WHERE id =${id};`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function insertar(TABLA,data) {
  return new Promise((resolve, reject) => {
     conexion.query(`INSERT INTO ${TABLA} SET  ?`,data, (error, result) => {
         return error ? reject(error) : resolve(result);
     })
 })
}
function actualizar(TABLA, data) {
 return new Promise((resolve, reject) => {
     conexion.query(`UPDATE ${TABLA} SET ? WHERE id = ?`,[data,data.id], (error, result) => {
         return error ? reject(error) : resolve(result);
     })
 })

}


function agregar(TABLA, data) {
 if (data && data.id == 0) {
     return insertar(TABLA, data)
 } else {
     return actualizar(TABLA, data)
 }
}

function eliminar(tabla, data) {
  return new Promise((resolve, reject) => {
      conexion.query(`DELETE FROM  ${tabla} WHERE id = ?`,data.id, (error, result) => {
          return error ? reject(error) : resolve(result);
      })
    })
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
  actualizar,
};
