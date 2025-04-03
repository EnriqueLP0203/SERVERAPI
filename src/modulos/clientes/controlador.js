const bd = require('../../BD/mysql')

const TABLA = 'clientes'

function todos(){
    return bd.todos(TABLA)

}


function uno(){

}

function agregar(data){
    return bd.agregar(TABLA, data)

}

function eliminar(){

}

function actualizar(){

}

module.exports={
    todos, uno, agregar, eliminar, actualizar
}
