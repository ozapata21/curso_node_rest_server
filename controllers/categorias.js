const { response, request } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async( req, res = response ) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');
    res.json( categoria );
}

const crearCategoria = async ( req, res = response) => {
    nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    } 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);
    await categoria.save();

    res.status(200).json(categoria);
}

const actualizarCategoria = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id , data, {new:true});

    if(categoria){
        res.json({
            categoria
        })
    }   

}

const borrarCategoria = async( req, res=response ) =>{
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(categoria);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}