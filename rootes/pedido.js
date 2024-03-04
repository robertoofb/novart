const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config/config.db");

const getPedido = (request, response) => {
    connection.query("SELECT * FROM pedido",
    (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/pedido").get(getPedido);
module.exports = app;

const postPedido = (request, response) => {
    const {action, id, fecha, hora, estado, metodo_pago, direccion_envio, cliente, detalle_producto} = request.body;
    /*connection.query("INSERT INTO pedido (fecha, hora, estado, metodo_pago, direccion_envio, FkCliente, FkDetalleProducto) VALUES (?,?,?,?,?,?,?)",
    [fecha, hora, estado, metodo_pago, direccion_envio, cliente, detalle_producto],
    (error, results) => {
        if(error)
        throw error;
        response.status(201).json({"Pedido añadido correctamente": results.affectedRows});
    });*/
    if(action == "insert"){
        connection.query("INSERT INTO pedido (fecha, hora, estado, metodo_pago, direccion_envio, FkCliente, FkDetalleProducto) VALUES (?,?,?,?,?,?,?)",
        [fecha, hora, estado, metodo_pago, direccion_envio, cliente, detalle_producto],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Pedido añadido correctamente": results.affectedRows});
        });
    }else{
        //console.log(action);return false;
        connection.query("UPDATE pedido SET fecha = ?, hora = ? , estado = ?, metodo_pago = ?, direccion_envio = ? , FkCliente = ?, FkDetalleProducto = ? WHERE id_pedido = ?", 
        [fecha, hora, estado, metodo_pago, direccion_envio, cliente, detalle_producto,id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Pedido editado con exito": results.affectedRows});
        });
    }
};
app.route("/pedido").post(postPedido);

const delPedido = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM pedido WHERE id_pedido = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Pedido eliminado":results.affectedRows});
    });
};
app.route("/pedido/:id").delete(delPedido);

