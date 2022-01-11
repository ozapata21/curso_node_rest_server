const { compareSync } = require("bcryptjs");
const { response } = require("express");
const { Role } = require("../models");

const obtenerRoles = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, roles ] = await Promise.all([
        Role.countDocuments(query),
        Role.find(query)
        .populate('rol')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        roles
    });
}

const obtenerRole = async( req, res = response ) => {
    console.log(req.params);
    const { id } = req.params;
    const role = await Role.findById(id).populate('rol');
    res.json( role );
}

const crearRole = async ( req, res = response) => {
    rol = req.body.rol.toUpperCase();
    const roleDB = await Role.findOne({ rol });
    if(roleDB){
        return res.status(400).json({
            msg: `El role ${rol} ya existe`
        })
    } 

    const data = {
        rol,
        usuario: req.usuario._id
    }

    const role = await new Role(data);
    await role.save();

    res.status(200).json(role);
}

const actualizarRole = async( req, res = response) => {
    const { id } = req.params;
    const { rol, ...data } = req.body;

    const role = await Role.findByIdAndUpdate( id , {rol:rol.toUpperCase()}, {new:true});

    if(role){
        res.json({
            role
        })
    }   

}

const borrarRole = async( req, res=response ) =>{
    const { id } = req.params;
    const role = await Role.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(role);
}

module.exports = {
    crearRole,
    obtenerRoles,
    obtenerRole,
    actualizarRole,
    borrarRole
}