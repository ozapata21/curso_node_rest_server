const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearOrgVenta, 
    obtenerOrgVentas, 
    obtenerOrgVenta, 
    actualizarOrgVenta, 
    borrarOrgVenta } = require('../controllers/orgventas.js');
const { existeOrgVentaPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerOrgVentas)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeOrgVentaPorId),
    validarCampos
], obtenerOrgVenta )

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearOrgVenta)

router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeOrgVentaPorId),
    validarCampos
], actualizarOrgVenta )

router.delete('/:id', [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeOrgVentaPorId),
    validarCampos
], borrarOrgVenta)

module.exports = router;