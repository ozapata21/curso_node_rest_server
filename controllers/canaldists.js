const { response, request } = require("express");
const { CanalDist } = require("../models");

const obtenerCanalDists = async ( req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, canalDists ] = await Promise.all([
        CanalDist.countDocuments(query),
        CanalDist.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        canalDists
    });
}

const obtenerCanalDist = async( req, res = response ) => {
    const { id } = req.params;
    const canalDist = await CanalDist.findById(id).populate('usuario','nombre');
    res.json( canalDist );
}

const crearCanalDist = async ( req, res = response) => {
    nombre = req.body.nombre.toUpperCase();
    const canalDistDB = await CanalDist.findOne({ nombre });
    if(canalDistDB){
        return res.status(400).json({
            msg: `La canalDist ${nombre} ya existe`
        })
    } 

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const canalDist = await new CanalDist(data);
    await canalDist.save();

    res.status(200).json(canalDist);
}

const actualizarCanalDist = async( req, res = response) => {
    const { id } = req.params;
    const { activo, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const canalDist = await CanalDist.findByIdAndUpdate( id , data, {new:true});

    if(canalDist){
        res.json({
            canalDist
        })
    }   

}

const borrarCanalDist = async( req, res=response ) =>{
    const { id } = req.params;
    const canalDist = await CanalDist.findByIdAndUpdate(id,{activo:false},{new:true})
    res.status(200).json(canalDist);
}

module.exports = {
    crearCanalDist,
    obtenerCanalDists,
    obtenerCanalDist,
    actualizarCanalDist,
    borrarCanalDist
}