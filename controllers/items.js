const { response, request } = require("express");
const { Item, Categoria } = require("../models");

const obtenerItems = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, items ] = await Promise.all([
        Item.countDocuments(query),
        Item.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        items
    });
}

const obtenerItem = async( req, res = response ) => {
    const { id } = req.params;
    const item = await Item.findById(id).populate('usuario','nombre');
    res.json( item );
}

const crearItem = async ( req, res = response) => {
    nombre = req.body.nombre.toUpperCase();
    const itemDB = await Item.findOne({ nombre });
    if(itemDB){
        return res.status(400).json({
            msg: `La item ${nombre} ya existe`
        })
    } 

    const data = {
        nombre,
        categoria:req.body.categoria,
        usuario: req.usuario._id
    }

    const item = await new Item(data);
    await item.save();
    res.status(200).json(item);
}

const actualizarItem = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    if (data.categoria){
        const categoria = await Categoria.findById(data.categoria)
        if( !categoria ){
            res.status(400).json({
                msg:'no existe categoria para el item'
            })
        }
    }

    const item = await Item.findByIdAndUpdate( id , data, {new:true});

    if(item){
        res.json({
            item
        })
    }   

}

const borrarItem = async( req, res=response ) =>{
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(item);
}

module.exports = {
    crearItem,
    obtenerItems,
    obtenerItem,
    actualizarItem,
    borrarItem
}