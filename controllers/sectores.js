const { response, request } = require("express");
const { Sectore } = require("../models");

const obtenerSectores = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, sectores ] = await Promise.all([
        Sectore.countDocuments(query),
        Sectore.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        sectores
    });
}

const obtenerSectore = async( req, res = response ) => {
    const { id } = req.params;
    const sectore = await Sectore.findById(id).populate('usuario','nombre');
    res.json( sectore );
}

const crearSectore = async ( req, res = response) => {
    nombre = req.body.nombre.toUpperCase();
    const sectoreDB = await Sectore.findOne({ nombre });
    if(sectoreDB){
        return res.status(400).json({
            msg: `La cSectore ${nombre} ya existe`
        })
    } 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const sectore = await new Sectore(data);
    await sectore.save();

    res.status(200).json(sectore);
}

const actualizarSectore = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const sectore = await Sectore.findByIdAndUpdate( id , data, {new:true});

    if(sectore){
        res.json({
            sectore
        })
    }   

}

const borrarSectore = async( req, res=response ) =>{
    const { id } = req.params;
    const sectore = await Sectore.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(sectore);
}

module.exports = {
    crearSectore,
    obtenerSectores,
    obtenerSectore,
    actualizarSectore,
    borrarSectore
}