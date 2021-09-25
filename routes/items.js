const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearItem, 
    obtenerItems, 
    obtenerItem, 
    actualizarItem, 
    borrarItem } = require('../controllers/items');
const { existeItemPorId,existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerItems)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeItemPorId),
    validarCampos
], obtenerItem )

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearItem)

router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeItemPorId),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], actualizarItem )

router.delete('/:id', [
    validarJWT,
    check('id').custom(existeItemPorId),
    validarCampos
], borrarItem)

module.exports = router;