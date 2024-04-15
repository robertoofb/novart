const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config/config.db");

const getDetalleP = (request, response) => {
    connection.query("SELECT * FROM detalle_producto",
    (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/detalle_producto").get(getDetalleP);
module.exports = app;

const postDetalleP = (request, response) => {
    const { action, id, producto, cantidad, precio, total, id_detalle_producto } = request.body;

    if (action == "insert") {
        connection.query("INSERT INTO detalle_producto (FkProducto, cantidad, precio, total) VALUES (?, ?, ?, ?)",
            [producto, cantidad, precio, total],
            (error, results) => {
                if (error) {
                    console.error("Error al insertar detalle del producto:", error);
                    response.status(500).json({ error: "No se pudo agregar el detalle del producto" });
                } else {
                    response.status(201).json({ "Detalle del producto añadido correctamente": results.affectedRows });
                }
            });
    } else {
        connection.query("UPDATE detalle_producto SET FkProducto = ?, cantidad = ?, precio = ?, total = ? WHERE id_detalle_producto = "+id_detalle_producto+"",
            [producto, cantidad, precio, total, id],
            (error, results) => {
                if (error) {
                    console.error("Error al editar detalle del producto:", error);
                    response.status(500).json({ error: "No se pudo editar el detalle del producto" });
                } else {
                    response.status(201).json({ "Detalle del producto editado con éxito": results.affectedRows });
                }
            });
    }
};
app.route("/detalle_producto").post(postDetalleP);


const delDetalleP = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM detalle_producto WHERE id_detalle_producto = ?",
        [id],
        (error, results) => {
            if (error) {
                console.error("Error al eliminar detalle del producto:", error);
                response.status(500).json({ error: "No se pudo eliminar el detalle del producto" });
            } else {
                if (results.affectedRows === 0) {
                    response.status(404).json({ error: "El detalle del producto con el ID proporcionado no existe" });
                } else {
                    response.status(200).json({ "Detalle del producto eliminado correctamente": results.affectedRows });
                }
            }
        });
};
app.route("/detalle_producto/:id").delete(delDetalleP);

const getDetallePId = (request,response) => {
    const id = request.params.id;
    connection.query("SELECT dp.*, dp.FkProducto AS producto, dp.cantidad AS cantidad, dp.precio AS precio, dp.total AS total FROM detalle_producto dp WHERE dp.id_detalle_producto = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/detalle_productos/:id").get(getDetallePId);


