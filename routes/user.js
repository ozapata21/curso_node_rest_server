const { Router } = require('express');
const {  
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch }  = require('../controller/user');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/',usuariosDelete);

router.delete('/',usuariosPatch);

module.exports = router;