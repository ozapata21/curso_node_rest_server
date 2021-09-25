const { Router } = require('express');
const { check } = require('express-validator'); 

const { 
    validarCampos, validarJWT, esAdminRol, tienRol
} = require('../middlewares');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { esAdminRol, tienRol } = require('../middlewares/validar-roles');
// const { validarJWT } = require('../middlewares/validar-jwt');

const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const {  
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch }  = require('../controllers/usuarios');

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
    validarJWT,
    // esAdminRol,
    tienRol('ADMIN_ROLE','VENTAS_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.delete('/',usuariosPatch);

module.exports = router;