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
    const { action, id, fecha, hora, estado, metodo_pago, direccion_envio, cliente, detalle_producto, id_pedido } = request.body;

    if (action == "insert") {
        connection.query("INSERT INTO pedido (fecha, hora, estado, metodo_pago, direccion_envio, FkCliente, FkDetalleProducto) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [fecha, hora, estado, metodo_pago, direccion_envio, cliente, detalle_producto],
            (error, results) => {
                if (error) {
                    console.error("Error al insertar pedido:", error);
                    response.status(500).json({ error: "No se pudo agregar el pedido" });
                } else {
                    response.status(201).json({ "Pedido añadido correctamente": results.affectedRows });
                }
            });
    } else {
        connection.query("UPDATE pedido SET fecha = ?, hora = ?, estado = ?, metodo_pago = ?, direccion_envio = ?, FkCliente = ?, FkDetalleProducto = ? WHERE id_pedido = "+id_pedido+"",
            [fecha, hora, estado, metodo_pago, direccion_envio, cliente, detalle_producto, id],
            (error, results) => {
                if (error) {
                    console.error("Error al editar pedido:", error);
                    response.status(500).json({ error: "No se pudo editar el pedido" });
                } else {
                    response.status(201).json({ "Pedido editado con éxito": results.affectedRows });
                }
            });
    }
};
app.route("/pedido").post(postPedido);


const delPedido = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM pedido WHERE id_pedido = ?",
        [id],
        (error, results) => {
            if (error) {
                console.error("Error al eliminar pedido:", error);
                response.status(500).json({ error: "No se pudo eliminar el pedido" });
            } else {
                if (results.affectedRows === 0) {
                    response.status(404).json({ error: "El pedido con el ID proporcionado no existe" });
                } else {
                    response.status(200).json({ "Pedido eliminado correctamente": results.affectedRows });
                }
            }
        });
};
app.route("/pedido/:id").delete(delPedido);

const getPedidoId = (request,response) => {
    const id = request.params.id;
    connection.query("SELECT p.*, p.fecha AS fecha, p.hora AS hora, p.estado AS estado, p.metodo_pago AS metodo_pago, p.direccion_envio AS direccion_envio, p.FkCliente AS cliente, p.FkDetalleProducto AS detalle_producto FROM pedido p WHERE p.id_pedido = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/pedidos/:id").get(getPedidoId);

