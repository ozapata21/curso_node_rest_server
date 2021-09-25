const { response, request } = require("express");
const { ClasePedido } = require("../models");

const obtenerClasePedidos = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, clasePedidos ] = await Promise.all([
        ClasePedido.countDocuments(query),
        ClasePedido.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        clasePedidos
    });
}

const obtenerClasePedido = async( req, res = response ) => {
    const { id } = req.params;
    const clasePedido = await ClasePedido.findById(id).populate('usuario','nombre');
    res.json( clasePedido );
}

const crearClasePedido = async ( req, res = response) => {
    nombre = req.body.nombre.toUpperCase();
    const clasePedidoDB = await ClasePedido.findOne({ nombre });
    if(clasePedidoDB){
        return res.status(400).json({
            msg: `La clase de pedido ${nombre} ya existe`
        })
    } 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const clasePedido = await new ClasePedido(data);
    await clasePedido.save();

    res.status(200).json(clasePedido);
}

const actualizarClasePedido = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const clasePedido = await ClasePedido.findByIdAndUpdate( id , data, {new:true});

    if(clasePedido){
        res.json({
            clasePedido
        })
    }   

}

const borrarClasePedido = async( req, res=response ) =>{
    const { id } = req.params;
    const clasePedido = await ClasePedido.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(clasePedido);
}

module.exports = {
    crearClasePedido,
    obtenerClasePedidos,
    obtenerClasePedido,
    actualizarClasePedido,
    borrarClasePedido
}