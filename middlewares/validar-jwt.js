
const { response } = require('express');
const jwt = require('jsonwebtoken');
const { usuariosDelete } = require('../controllers/user');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res=response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // req.uid = uid;
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'token no valido -no existe'
            })
        }

        if( !usuario.estado){
            return res.status(401).json({
                msg: 'token no valido -usuario baja'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
        
    }
}

module.exports = {
    validarJWT
}