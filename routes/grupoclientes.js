const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearGrupoCliente, 
    obtenerGrupoClientes, 
    obtenerGrupoCliente, 
    actualizarGrupoCliente, 
    borrarGrupoCliente } = require('../controllers/GrupoClientes');
const { existeGrupoClientePorId } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerGrupoClientes)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeGrupoClientePorId),
    validarCampos
], obtenerGrupoCliente )

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearGrupoCliente)

router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeGrupoClientePorId),
    validarCampos
], actualizarGrupoCliente )

router.delete('/:id', [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeGrupoClientePorId),
    validarCampos
], borrarGrupoCliente)

module.exports = router;