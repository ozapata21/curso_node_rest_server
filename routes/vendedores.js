const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearVendedor, 
    obtenerVendedores, 
    obtenerVendedor, 
    actualizarVendedor, 
    borrarVendedor } = require('../controllers/vendedores');
const { existeVendedorPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerVendedores)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeVendedorPorId),
    validarCampos
], obtenerVendedor )

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearVendedor)

router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeVendedorPorId),
    validarCampos
], actualizarVendedor )

router.delete('/:id', [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeVendedorPorId),
    validarCampos
], borrarVendedor)

module.exports = router;