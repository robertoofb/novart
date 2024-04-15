const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    // Lógica para registrar usuarios
};

exports.login = async (req, res) => {
    // Lógica para iniciar sesión
};

exports.verifyToken = (req, res, next) => {
    // Middleware para verificar el token
};
