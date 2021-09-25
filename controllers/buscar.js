const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Item, Estado, Paise, Municipio } = require('../models');
const coleccionesPermitidas = [
    'categorias',
    'estados',
    'items',
    'municipios',
    'ordenes',
    'paises',
    'roles',
    'usuarios',
]

const buscarUsuarios = async ( termino, res = response ) => {
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json(
            {
                results: (usuario) ? [usuario] : []
            }            
        )
    }

    const expreg = RegExp( termino, 'i' );

    const usuarios = await Usuario.find({
        $or: [{nombre: expreg},{correo: expreg}],
        $and: [{estado:true}]
    });
    res.json({
        results: usuarios
    })
}

const buscarCategorias = async ( termino, res = response ) => {
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json(
            {
                results: (categoria) ? [categoria] : []
            }            
        )
    }
    const expreg = RegExp( termino, 'i' );
    const categorias = await Categoria.find({nombre: expreg, estado:true});
    res.json({
        results: categorias
    })
}

const buscarEstados = async ( termino, res = response ) => {
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId) {
        const estado = await Estado.findById(termino);
        return res.json(
            {
                results: (estado) ? [estado] : []
            }            
        )
    }
    const expreg = RegExp( termino, 'i' );
    const estados = await Estado.find({nombre: expreg, activo:true});
    res.json({
        results: estados
    })
}

const buscarItems = async ( termino, res = response ) => {
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId) {
        const item = await Item.findById(termino);
        return res.json(
            {
                results: (item) ? [item] : []
            }            
        )
    }
    const expreg = RegExp( termino, 'i' );
    const items = await Item.find({nombre: expreg, estado:true});
    res.json({
        results: items
    })
}

const buscarPaises = async ( termino, res = response ) => {
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId) {
        const pais = await Paise.findById(termino);
        return res.json(
            {
                results: (pais) ? [pais] : []
            }            
        )
    }
    const expreg = RegExp( termino, 'i' );
    const paises = await Paise.find({nombre: expreg, estado:true});
    res.json({
        results: paises
    })
}

const buscarMunicipio = async ( termino, res = response ) => {
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId) {
        const municipio = await Municipio.findById(termino);
        return res.json(
            {
                results: (municipio) ? [municipio] : []
            }            
        )
    }
    const expreg = RegExp( termino, 'i' );
    const municipios = await Municipio.find({nombre: expreg, estado:true});
    res.json({
        results: municipios
    })
}


const buscar = ( req, res = response ) => {
    
    const { coleccion, termino } = req.params;
    if( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg: `La colección ${coleccion} no esta permitida` 
        })
    } 

    switch (coleccion) {
        case 'categorias':
            buscarCategorias( termino, res );
            break;
        case 'estados':
            buscarEstados( termino, res );
            break;

        case 'items':
            buscarItems( termino, res );
            break;

        case 'municipios':
            buscarMunicipio( termino, res );
            break;

        case 'ordenes':
            break;

        case 'paises':
            buscarPaises( termino, res );
            break;

        case 'roles':
            break;

        case 'usuarios':
            buscarUsuarios(termino,res)
            break;

        default:
            res.status(500).json({
                msg: 'No esta implementada la busqueda'
            })
    }
}

module.exports =  { buscar };
