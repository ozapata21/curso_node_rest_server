const { response } = require('express');
const  Usuario  = require('../models/usuario');
const bcriptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos--correo'
            })
        }

        if( !usuario.estado ){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos--estado:falso'
            })
        }
        
        const validPassword = bcriptjs.compareSync(password,usuario.password); 
        
        if ( !validPassword){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos--password'
            })
        }

        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Algo salio mal con el login'
        })
    }
}

const revalidarToken = async(req, res = response)=>{

    const token = await generarJWT( req.usuario.id )
    const usuario = req.usuario;
    return res.status(200).json({usuario,token})
    
}

module.exports = {
    login,
    revalidarToken
}