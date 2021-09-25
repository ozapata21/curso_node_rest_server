const { response } = require('express');
const Socio = require('../models/socio');

const sociosGet = async (req, res= response)=>{
    const { limite = 14, desde = 0 } = req.query;
    const query = { activo: true }    
    const [ total, socio ] = await Promise.all([
        Socio.countDocuments(query),
        Socio.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    
    res.json({
        total,
        socio
    });
}

const socioGet = async( req, res = response ) => {
    const { id } = req.params;
    const socio = await Socio.findById(id).populate('usuario','nombre');
    res.json( socio );
}

const sociosPut = async(req,res = response)=>{
    const { id } = req.params;
    const {_id, rfc, ...resto } = req.body;
    
    resto.usuario = req.usuario._id;
    const socio = await Socio.findByIdAndUpdate( id, resto, {new:true} );
        
    res.json({
        socio
    })
}

const sociosPost = async (req, res = response)=>{
    const { 
        rfc, 
        nombre, 
        calle, 
        numeroExt, 
        numeroInt, 
        colonia, 
        localidad, 
        municipio, 
        estado, 
        pais, 
        correo, 
        telefono,
        lat,
        lon,
        canalDist,
        grupoCliente,
        vendedor,
        condicionPago,
        cuentasBancarias
     } = req.body;

    const socio = new Socio({ 
        rfc, 
        nombre, 
        calle, 
        numeroExt, 
        numeroInt, 
        colonia, 
        localidad, 
        municipio, 
        estado, 
        pais, 
        correo, 
        telefono,
        lat,
        lon        
     });

     socio.usuario = req.usuario._id;
     if(canalDist){socio.canalDist = canalDist}
     if(grupoCliente){socio.grupoCliente = grupoCliente}
     if(vendedor){socio.vendedor = vendedor}
     if(condicionPago){socio.condicionPago = condicionPago}
     if(cuentasBancarias){socio.cuentasBancarias = cuentasBancarias}     

     await socio.save();

    res.json({
        socio
    })
}

const sociosDelete = async (req,res = response)=>{
    const { id } = req.params;
    const socio = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        socio,
    })
}

const sociosPatch = (req,res = response)=>{
    res.json({
        msg:'Patch'
    })
}

module.exports = {
    sociosGet,
    socioGet,
    sociosPut,
    sociosPost,
    sociosDelete,
    sociosPatch
}

