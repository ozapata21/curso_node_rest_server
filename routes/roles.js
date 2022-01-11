const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearRole, 
    obtenerRoles, 
    obtenerRole, 
    actualizarRole, 
    borrarRole } = require('../controllers/Roles');
const { existeRolePorId } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerRoles)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeRolePorId),
    validarCampos
], obtenerRole )

router.post('/', [
    validarJWT,
    check('rol','El nombre del rol es obligatorio').not().isEmpty(),
    validarCampos
], crearRole)

router.put('/:id', [
    validarJWT,
    check( 'rol', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeRolePorId),
    validarCampos
], actualizarRole )

router.delete('/:id', [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeRolePorId),
    validarCampos
], borrarRole)

module.exports = router;