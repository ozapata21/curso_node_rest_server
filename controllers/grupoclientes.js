const { response, request } = require("express");
const { GrupoCliente } = require("../models");

const obtenerGrupoClientes = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, grupoClientes ] = await Promise.all([
        GrupoCliente.countDocuments(query),
        GrupoCliente.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        grupoClientes
    });
}

const obtenerGrupoCliente = async( req, res = response ) => {
    const { id } = req.params;
    const grupoCliente = await GrupoCliente.findById(id).populate('usuario','nombre');
    res.json( grupoCliente );
}

const crearGrupoCliente = async ( req, res = response) => {
    nombre = req.body.nombre.toUpperCase();
    const grupoClienteDB = await GrupoCliente.findOne({ nombre });
    if(grupoClienteDB){
        return res.status(400).json({
            msg: `La grupoCliente ${nombre} ya existe`
        })
    } 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const grupoCliente = await new GrupoCliente(data);
    await grupoCliente.save();

    res.status(200).json(grupoCliente);
}

const actualizarGrupoCliente = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const grupoCliente = await GrupoCliente.findByIdAndUpdate( id , data, {new:true});

    if(grupoCliente){
        res.json({
            grupoCliente
        })
    }   

}

const borrarGrupoCliente = async( req, res=response ) =>{
    const { id } = req.params;
    const grupoCliente = await GrupoCliente.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(grupoCliente);
}

module.exports = {
    crearGrupoCliente,
    obtenerGrupoClientes,
    obtenerGrupoCliente,
    actualizarGrupoCliente,
    borrarGrupoCliente
}