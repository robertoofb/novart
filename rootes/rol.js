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
    const {action, id, nombre} = request.body;

    if(action == "insert"){
        connection.query("INSERT INTO rol (nombre) VALUES (?)", 
        [nombre],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Rol añadido correctamente": results.affectedRows});
        });
    }else{
        //console.log(action);return false;
        connection.query("UPDATE rol SET nombre = ? WHERE id_rol = ?", 
        [nombre, id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Rol editado con exito": results.affectedRows});
        });
    }
};
app.route("/rol").post(postRol);

const delRol = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM rol WHERE id_rol = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Rol eliminado":results.affectedRows});
    });
};
app.route("/rol/:id").delete(delRol);

