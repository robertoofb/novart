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
    const {action,id, nombre,apellido,correo,contraseña,rol} = request.body;

    if(action == "insert"){
        connection.query("INSERT INTO usuario (nombre, apellido, correo, contraseña, FkRol) VALUES (?,?,?,?,?)", 
        [nombre,apellido,correo,contraseña,rol],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Usuario añadido correctamente": results.affectedRows});
        });
    }else{
        //console.log(action);return false;
        connection.query("UPDATE usuario SET nombre = ?, apellido = ? , correo = ?, contraseña = ?, FkRol = ? WHERE id_usuario = ?", 
        [nombre,apellido,correo,contraseña,rol,id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Usuario editado con exito": results.affectedRows});
        });
    }
};
app.route("/usuario").post(postUsuario);

const delUsuario = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM usuario WHERE id_usuario = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Usuario eliminado":results.affectedRows});
    });
};
app.route("/usuario/:id").delete(delUsuario);

