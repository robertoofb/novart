const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config/config.db");

const getRol = (request, response) => {
    connection.query("SELECT * FROM rol",
    (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/rol").get(getRol);
module.exports = app;

const postRol = (request, response) => {
    const { action, id, nombre, id_rol} = request.body;

    if (action == "insert") {
        connection.query("INSERT INTO rol (nombre) VALUES (?)",
            [nombre],
            (error, results) => {
                if (error) {
                    console.error("Error al insertar rol:", error);
                    response.status(500).json({ error: "No se pudo agregar el rol" });
                } else {
                    response.status(201).json({ "Rol añadido correctamente": results.affectedRows });
                }
            });
    } else {
        connection.query("UPDATE rol SET nombre = ? WHERE id_rol = "+id_rol+"",
            [nombre, id],
            (error, results) => {
                if (error) {
                    console.error("Error al editar rol:", error);
                    response.status(500).json({ error: "No se pudo editar el rol" });
                } else {
                    response.status(201).json({ "Rol editado con éxito": results.affectedRows });
                }
            });
    }
};
app.route("/rol").post(postRol);


const delRol = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM rol WHERE id_rol = ?",
        [id],
        (error, results) => {
            if (error) {
                console.error("Error al eliminar rol:", error);
                response.status(500).json({ error: "No se pudo eliminar el rol" });
            } else {
                if (results.affectedRows === 0) {
                    response.status(404).json({ error: "El rol con el ID proporcionado no existe" });
                } else {
                    response.status(200).json({ "Rol eliminado correctamente": results.affectedRows });
                }
            }
        });
};
app.route("/rol/:id").delete(delRol);

const getRolId = (request,response) => {
    const id = request.params.id;
    connection.query("SELECT rl.*, rl.nombre AS nombre FROM rol rl WHERE rl.id_rol = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/roles/:id").get(getRolId);

