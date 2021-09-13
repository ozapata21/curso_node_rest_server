const { response } = require('express');

const esAdminRol = ( req, res = response , netx) => {
    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin tener el token'
        })
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador `
        })
    }

    netx();
}

const tienRol = ( ...roles ) => {

    return ( req, res, next) =>{

        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin tener el token'
            })
        }

        if( !roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere los siguientes roles: ${roles}`
            })
        }
        console.log(roles, req.usuario.rol);
        next();
    }

}

module.exports = {
    esAdminRol,
    tienRol
}