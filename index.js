const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static('public'));
//cargamos el archivo de rutas
app.use(require('./rootes/rol'));
app.use(require('./rootes/usuario'));
app.use(require('./rootes/producto'));
app.use(require('./rootes/pedido'));
app.use(require('./rootes/detalle_producto'));
app.use(require('./rootes/cliente'));

//app.use(require('./routes/materias'));
const PORT=process.env.PORT;
app.listen(PORT,() => {
    console.log('El servidor escucha en el puerto '+PORT);
});
module.exports = app;