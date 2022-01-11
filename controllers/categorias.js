const { response, request } = require("express");
const { Categoria } = require("../models");
const { nextSeq, formatId } = require("../helpers/seq");

const obtenerCategorias = async ( req, res = response ) => { 
    
    const { filterField = '', filterValue = '', pageSize = 5, pageIndex = 0, sortField='nombre', sortDirection = 'asc' } = req.query;
    const from = pageSize*pageIndex;
    
    let query = {activo: true};

    if(filterField!=''){
        var regexpFilterValue = new RegExp("^" + filterValue.toUpperCase());
        query[filterField] = regexpFilterValue;
    }

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(from))
        .limit(Number(pageSize))
        .sort({[sortField]: sortDirection })
        .catch(err=>console.log(err))
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

    const seqMD = await nextSeq('categorias'); 
    console.log(
        formatId(seqMD.seq.toString(),5)
    );

    nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    } 

    const data = {
        categoria:formatId(seqMD.seq.toString(),5),
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