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
    const {action, id, producto,cantidad,precio,total} = request.body;

    if(action == "insert"){
        connection.query("INSERT INTO detalle_producto (FkProducto,cantidad,precio,total) VALUES (?,?,?,?)",
        [producto,cantidad,precio,total],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Detalle del producto añadido correctamente": results.affectedRows});
        });
    }else{
        //console.log(action);return false;
        connection.query("UPDATE detalle_producto SET FkProducto = ?, cantidad = ? , precio = ? , total = ? WHERE id_detalle_producto = ?", 
        [producto,cantidad,precio,total,id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Detalle del producto editado con exito": results.affectedRows});
        });
    }
};
app.route("/detalle_producto").post(postDetalleP);

const delDetalleP = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM detalle_producto WHERE id_detalle_producto = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"detalle_producto eliminado":results.affectedRows});
    });
};
app.route("/detalle_producto/:id").delete(delDetalleP);

