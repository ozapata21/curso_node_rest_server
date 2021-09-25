const { response, request } = require("express");
const { OrgVenta } = require("../models");

const obtenerOrgVentas = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, orgVentas ] = await Promise.all([
        OrgVenta.countDocuments(query),
        OrgVenta.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        orgVentas
    });
}

const obtenerOrgVenta = async( req, res = response ) => {
    const { id } = req.params;
    const orgVenta = await OrgVenta.findById(id).populate('usuario','nombre');
    res.json( orgVenta );
}

const crearOrgVenta = async ( req, res = response) => {
    nombre = req.body.nombre.toUpperCase();
    const orgVentaDB = await OrgVenta.findOne({ nombre });
    if(orgVentaDB){
        return res.status(400).json({
            msg: `La cOrgVenta ${nombre} ya existe`
        })
    } 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const orgVenta = await new OrgVenta(data);
    await orgVenta.save();

    res.status(200).json(orgVenta);
}

const actualizarOrgVenta = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const orgVenta = await OrgVenta.findByIdAndUpdate( id , data, {new:true});

    if(orgVenta){
        res.json({
            orgVenta
        })
    }   

}

const borrarOrgVenta = async( req, res=response ) =>{
    const { id } = req.params;
    const orgVenta = await OrgVenta.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(orgVenta);
}

module.exports = {
    crearOrgVenta,
    obtenerOrgVentas,
    obtenerOrgVenta,
    actualizarOrgVenta,
    borrarOrgVenta
}