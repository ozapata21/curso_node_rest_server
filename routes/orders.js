const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearOrder, 
    obtenerOrders, 
    obtenerOrder, 
    actualizarOrder, 
    borrarOrder 
} = require('../controllers/orders');
const { 
    existeOrderPorId,
    existeCategoriaPorId,
    existeSocioPorId
 } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerOrders)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeOrderPorId),
    validarCampos
], obtenerOrder )

router.post('/', [
    validarJWT,
    check('solicitante','El solicitante es obligatorio').not().isEmpty(),
    check('solicitante','No es un id de mongo el solicitante').isMongoId(),
    check('solicitante').custom(existeSocioPorId),
    validarCampos
], crearOrder)

router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeOrderPorId),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], actualizarOrder )

router.delete('/:id', [
    validarJWT,
    check('id').custom(existeOrderPorId),
    validarCampos
], borrarOrder)

module.exports = router;