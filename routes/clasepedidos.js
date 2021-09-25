const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearClasePedido, 
    obtenerClasePedidos, 
    obtenerClasePedido, 
    actualizarClasePedido, 
    borrarClasePedido } = require('../controllers/clasePedidos');
const { existeClasePedidoPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerClasePedidos)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeClasePedidoPorId),
    validarCampos
], obtenerClasePedido )

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearClasePedido)

router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeClasePedidoPorId),
    validarCampos
], actualizarClasePedido )

router.delete('/:id', [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeClasePedidoPorId),
    validarCampos
], borrarClasePedido)

module.exports = router;