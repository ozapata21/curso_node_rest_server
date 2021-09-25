const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarCampos, validarJWT } = require('../middlewares');
const { 
    crearSectore, 
    obtenerSectores, 
    obtenerSectore, 
    actualizarSectore, 
    borrarSectore } = require('../controllers/sectores');
const { existeSectorePorId } = require('../helpers/db-validators');

const router = Router();

router.get('/',[

], obtenerSectores)

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeSectorePorId),
    validarCampos
], obtenerSectore )

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearSectore)

router.put('/:id', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeSectorePorId),
    validarCampos
], actualizarSectore )

router.delete('/:id', [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeSectorePorId),
    validarCampos
], borrarSectore)

module.exports = router;