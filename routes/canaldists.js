const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearCanalDist, 
    obtenerCanalDists, 
    obtenerCanalDist, 
    actualizarCanalDist, 
    borrarCanalDist } = require('../controllers/canaldists');
const { existeCanalDistPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerCanalDists)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCanalDistPorId),
    validarCampos
], obtenerCanalDist )

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCanalDist)

router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCanalDistPorId),
    validarCampos
], actualizarCanalDist )

router.delete('/:id', [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCanalDistPorId),
    validarCampos
], borrarCanalDist)

module.exports = router;