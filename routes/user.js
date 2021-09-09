const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const {  
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch }  = require('../controller/user');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('password', 'Password debe de ser de mas de 6 letras').isLength({min:6}),
    check('correo', 'Correo incorrecto').isEmail(),
    check('correo').custom( existeEmail ),
    // check('rol', 'no es un roll  permitido').isIn(['ADMIN_ROLE','USER_ROL']),
    check('rol').custom( esRoleValido ),    
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.delete('/',usuariosPatch);

module.exports = router;