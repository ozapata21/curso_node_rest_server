const { response } = require('express');

const usuariosGet = (req, res= response)=>{
    const query = req.query;
    res.json({
        msg: 'Api- controller',
        query
    })

}

const usuariosPut = (req,res = response)=>{
    const { id } = req.params;
    res.json({
        msg:'PUT',
        id
    })
}

const usuariosPost = (req, res = response)=>{
    
    const body = req.body;
    res.json({
        'msg':'hola mundo',
        body
    })
}

const usuariosDelete = (req,res = response)=>{
    res.json({
        msg:'Delete'
    })
}

const usuariosPatch = (req,res = response)=>{
    res.json({
        msg:'Patch'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}