const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config/config.db");

const getCliente = (request, response) => {
    connection.query("SELECT * FROM cliente",
    (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/cliente").get(getCliente);
module.exports = app;

const postCliente = (request, response) => {
    const {action, id, usuario,direccion,celular} = request.body;

    if(action == "insert"){
        connection.query("INSERT INTO cliente (FkUsuario,direccion,celular) VALUES (?,?,?)",
        [usuario,direccion,celular],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Cliente añadido correctamente": results.affectedRows});
        });
    }else{
        //console.log(action);return false;
        connection.query("UPDATE cliente SET FkUsuario = ?, direccion = ? , celular = ? WHERE id_cliente = ?", 
        [usuario,direccion,celular,id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Cliente editado con exito": results.affectedRows});
        });
    }
};
app.route("/cliente").post(postCliente);

const delCliente = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM cliente WHERE id_cliente = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"cliente eliminado":results.affectedRows});
    });
};
app.route("/cliente/:id").delete(delCliente);

