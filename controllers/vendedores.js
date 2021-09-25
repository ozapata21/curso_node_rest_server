const { response, request } = require("express");
const { Vendedore } = require("../models");

const obtenerVendedores = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, vendedores ] = await Promise.all([
        Vendedore.countDocuments(query),
        Vendedore.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        vendedores
    });
}

const obtenerVendedor = async( req, res = response ) => {
    const { id } = req.params;
    const vendedor = await Vendedore.findById(id).populate('usuario','nombre');
    res.json( vendedor );
}

const crearVendedor = async ( req, res = response) => {
    nombre = req.body.nombre.toUpperCase();
    const vendedorDB = await Vendedore.findOne({ nombre });
    if(vendedorDB){
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    } 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const vendedor = await new Vendedore(data);
    await vendedor.save();

    res.status(200).json(vendedor);
}

const actualizarVendedor = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const vendedor = await Vendedore.findByIdAndUpdate( id , data, {new:true});

    if(vendedor){
        res.json({
            vendedor
        })
    }   

}

const borrarVendedor = async( req, res=response ) =>{
    const { id } = req.params;
    const vendedor = await Vendedore.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(vendedor);
}

module.exports = {
    obtenerVendedores,
    obtenerVendedor,
    crearVendedor,
    actualizarVendedor,
    borrarVendedor
}