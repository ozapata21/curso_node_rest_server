
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol='') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`)
    }
}

const existeEmail = async(correo ='') => {
    const existe = await Usuario.findOne({correo})
    if(existe){
        throw new Error(`El correo ${ correo } ya existe`)
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`No existe id del usuario ${id}`);
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}