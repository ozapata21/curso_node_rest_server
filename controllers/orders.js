const { response, request } = require("express");
const { connect } = require("mongoose");
const { Order, Categoria } = require("../models");

const obtenerOrders = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, order ] = await Promise.all([
        Order.countDocuments(query),
        Order.find(query)
        .populate('usuario', 'nombre')
        .populate('solicitante','nombre')
        // .populate('orderLine.item','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        order
    });
}

const obtenerOrder = async( req, res = response ) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate('usuario','nombre');
    res.json( order );
}

const crearOrder = async ( req, res = response) => {
    const { 
        clasePedido,
        organizacionVentas,
        canalDist,
        sector,
        solicitante,
        destinatario,
        vendedor,
        oc,
        fechaSurt,
        condicionPago,
        orderLine } = req.body;

        const data = { 
            clasePedido,
            organizacionVentas,
            canalDist,
            sector,
            solicitante,
            destinatario,
            vendedor,
            oc,
            fechaSurt,
            condicionPago,
            usuario: req.usuario._id,
            orderLine };

    const order = await new Order(data);
    await order.save();
    res.status(200).json(order);
}


//  item
//  descripcion
//  cantidad
//  precio

const actualizarOrder = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    if (data.categoria){
        const categoria = await Categoria.findById(data.categoria)
        if( !categoria ){
            res.status(400).json({
                msg:'no existe categoria para el order'
            })
        }
    }

    const order = await Order.findByIdAndUpdate( id , data, {new:true});

    if(order){
        res.json({
            order
        })
    }   

}

const borrarOrder = async( req, res=response ) =>{
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(order);
}

module.exports = {
    crearOrder,
    obtenerOrder,
    obtenerOrders,
    actualizarOrder,
    borrarOrder
}