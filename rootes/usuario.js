const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config/config.db");

const getUsuario = (request, response) => {
    connection.query("SELECT * FROM usuario",
    (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/usuario").get(getUsuario);
module.exports = app;

const postUsuario = (request, response) => {
    const { action, id, nombre, apellido, correo, contraseña, rol, id_usuario } = request.body;

    if (action == "insert") {
        connection.query("INSERT INTO usuario (nombre, apellido, correo, contraseña, FkRol) VALUES (?, ?, ?, ?, ?)",
            [nombre, apellido, correo, contraseña, rol],
            (error, results) => {
                if (error) {
                    console.error("Error al insertar usuario:", error);
                    response.status(500).json({ error: "No se pudo agregar el usuario" });
                } else {
                    response.status(201).json({ "Usuario añadido correctamente": results.affectedRows });
                }
            });
    } else {
        connection.query("UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, contraseña = ?, FkRol = ? WHERE id_usuario = "+id_usuario+"",
            [nombre, apellido, correo, contraseña, rol, id],
            (error, results) => {
                if (error) {
                    console.error("Error al editar usuario:", error);
                    response.status(500).json({ error: "No se pudo editar el usuario" });
                } else {
                    response.status(201).json({ "Usuario editado con éxito": results.affectedRows });
                }
            });
    }
};
app.route("/usuario").post(postUsuario);


const delUsuario = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM usuario WHERE id_usuario = ?",
        [id],
        (error, results) => {
            if (error) {
                console.error("Error al eliminar usuario:", error);
                response.status(500).json({ error: "No se pudo eliminar el usuario" });
            } else {
                if (results.affectedRows === 0) {
                    response.status(404).json({ error: "El usuario con el ID proporcionado no existe" });
                } else {
                    response.status(200).json({ "Usuario eliminado correctamente": results.affectedRows });
                }
            }
        });
};
app.route("/usuario/:id").delete(delUsuario);

const getUsuarioId = (request,response) => {
    const id = request.params.id;
    connection.query("SELECT us.*, us.nombre AS nombre, us.apellido AS apellido, us.correo AS correo, us.contraseña AS contraseña, us.FkRol AS rol FROM usuario us WHERE us.id_usuario = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/usuarios/:id").get(getUsuarioId);
