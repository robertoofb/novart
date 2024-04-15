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
    const {action, id, usuario,direccion,celular, id_cliente} = request.body;

    if(action == "insert"){
        connection.query("INSERT INTO cliente (FkUsuario,direccion,celular) VALUES (?,?,?)",
        [usuario,direccion,celular],
        (error, results) => {
            if (error) {
                console.error("Error al insertar cliente:", error);
                response.status(500).json({ error: "No se pudo agregar el cliente" });
            } else {
                response.status(201).json({ "Cliente añadido correctamente": results.affectedRows });
            }
        });
    }else{
        //console.log(action);return false;
        connection.query("UPDATE cliente SET FkUsuario = ?, direccion = ? , celular = ? WHERE id_cliente = "+id_cliente+"", 
        [usuario,direccion,celular,id],
        (error, results) => {
            if (error) {
                console.error("Error al editar cliente:", error);
                response.status(500).json({ error: "No se pudo editar el cliente" });
            } else {
                response.status(201).json({ "Cliente editado con éxito": results.affectedRows });
            }
        });
    }
};
app.route("/cliente").post(postCliente);

const delCliente = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM cliente WHERE id_cliente = ?",
        [id],
        (error, results) => {
            if (error) {
                console.error("Error al eliminar cliente:", error);
                response.status(500).json({ error: "No se pudo eliminar el cliente" });
            } else {
                if (results.affectedRows === 0) {
                    response.status(404).json({ error: "El cliente con el ID proporcionado no existe" });
                } else {
                    response.status(200).json({ "Cliente eliminado correctamente": results.affectedRows });
                }
            }
        });
};

app.route("/cliente/:id").delete(delCliente);

const getClienteId = (request,response) => {
    const id = request.params.id;
    connection.query("SELECT cl.*, cl.FkUsuario AS usuario, cl.direccion AS direccion, cl.celular AS celular FROM cliente cl WHERE cl.id_cliente = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/clientes/:id").get(getClienteId);



