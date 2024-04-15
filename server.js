const Sequelize = require('sequelize');

const sequelize = new Sequelize('novart ', 'usuario.nombre', 'usuario.contraseña', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Para deshabilitar los logs de Sequelize
});

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa con la base de datos'))
    .catch(err => console.error('Error de conexión con la base de datos:', err));


const User = require('./models/User');

// Sincronizar el modelo con la base de datos
sequelize.sync()
    .then(() => console.log('Modelos sincronizados correctamente'))
    .catch(err => console.error('Error al sincronizar modelos:', err));
