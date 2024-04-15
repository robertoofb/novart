const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config/config.db");

app.get('/imagen/:id', (req, res) => {
    const idImagen = req.params.id;
  
    // Consultar la base de datos para obtener los datos binarios de la imagen por ID
    connection.query('SELECT image FROM producto WHERE id = ?', [idImagen], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al obtener la imagen');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).send('Imagen no encontrada');
        return;
      }
  
      // Obtener los datos binarios de la imagen de los resultados
      const imagenBinaria = results[0].imagen;
  
      // Convertir los datos binarios en una cadena base64
      const imagenBase64 = Buffer.from(imagenBinaria).toString('base64');
  
      // Construir la URL base64
      const imagenURL = `data:image/jpeg;base64,${imagenBase64}`;
  
      // Enviar la URL base64 de la imagen al cliente
      res.json({ imagenURL });
    });
  });

const getProducto = (request, response) => {
    connection.query("SELECT * FROM producto",
    (error, results) =>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

app.route("/producto").get(getProducto);
module.exports = app;

const postProducto = (request, response) => {
    const {action ,id, nombre,descripcion,precio,talla,color,categoria,existencia,imagen, id_producto} = request.body;
    /*connection.query("INSERT INTO producto (nombre, descripcion, precio, talla, color, categoria, existencia, imagen) VALUES (?,?,?,?,?,?,?,?)",
    [nombre,descripcion,precio,talla,color,categoria,existencia,imagen],
    (error, results) => {
        if(error)
        throw error;
        response.status(201).json({"Producto añadido correctamente": results.affectedRows});
    });*/
    if(action == "insert"){
        connection.query("INSERT INTO producto (nombre, descripcion, precio, talla, color, categoria, existencia, imagen) VALUES (?,?,?,?,?,?,?,?)",
        [nombre,descripcion,precio,talla,color,categoria,existencia,imagen],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Producto añadido correctamente": results.affectedRows});
        });
    }else{
        //console.log(action);return false;
        connection.query("UPDATE producto SET nombre = ?, descripcion = ? , precio = ?, talla = ?, color = ? , categoria = ?, existencia = ?, imagen = ? WHERE id_producto = "+id_producto+"", 
        [nombre,descripcion,precio,talla,color,categoria,existencia,imagen,id],
        (error, results) => {
            if(error)
                throw error;
            response.status(201).json({"Producto editado con exito": results.affectedRows});
        });
    }
};
app.route("/producto").post(postProducto);

const delProducto = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM producto WHERE id_producto = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Producto eliminado":results.affectedRows});
    });
};
app.route("/producto/:id").delete(delProducto);

const getProductoId = (request,response) => {
    const id = request.params.id;
    connection.query("SELECT pr.*, pr.nombre AS nombre, pr.descripcion AS descripcion, pr.precio AS precio, pr.talla AS talla, pr.color AS color, pr.categoria AS categoria, pr.existencia AS existencia, pr.imagen AS imagen FROM producto pr WHERE pr.id_producto = ?",
    [id],
    (error,results)=>{
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
app.route("/productos/:id").get(getProductoId);


