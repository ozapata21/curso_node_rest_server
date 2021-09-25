const { Router } = require('express');
const { check }  = require('express-validator'); 

const { 
    validarCampos, validarJWT
} = require('../middlewares');

const { 
    esRoleValido,
    existeEmail, 
    existeRFC, 
    existeMunicipioPorId, 
    existeEstadoPorId,
    existePaisPorId,
    existeSocioPorId,
    validaCanalPorId,
    validaGrupoClientePorId,
    validaVendedorPorId 
} = require('../helpers/db-validators');

const {  
    sociosGet,
    socioGet,
    sociosPut,
    sociosPost,
    sociosDelete,
    sociosPatch }  = require('../controllers/socios');

const router = Router();

router.get('/', sociosGet);

router.get('/:id', [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeSocioPorId),
    validarCampos
], socioGet )

router.put('/:id', [
    validarJWT,
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('calle', 'La calle es obligatoria').not().isEmpty(),
    check('numeroExt', 'Numero exterior es obligatorio').not().isEmpty(),
    check('colonia', 'Colonia es obligatorio').not().isEmpty(),
    check('localidad', 'La localidad es obligatoria').not().isEmpty(),
    check('municipio', 'No es un id valido de municipio').isMongoId(),
    check('municipio').custom( existeMunicipioPorId ),
    check('estado', 'No es un id valido de estado').isMongoId(),
    check('estado').custom( existeEstadoPorId ),
    check('pais', 'No es un id valido de pais').isMongoId(),
    check('pais').custom( existePaisPorId ),
    check('correo', 'Correo incorrecto').isEmail(),
    validarCampos
], sociosPut);

router.post('/',   
[
    validarJWT,
    check('rfc', 'RFC obligatorio').not().isEmpty({min:6,max:14}),
    check('rfc').custom( existeRFC ), 
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('calle', 'La calle es obligatoria').not().isEmpty(),
    check('numeroExt', 'Numero exterior es obligatorio').not().isEmpty(),
    check('colonia', 'Colonia es obligatorio').not().isEmpty(),
    check('localidad', 'localidad').not().isEmpty(),
    check('municipio', 'No es un id valido de municipio').isMongoId(),
    check('municipio').custom( existeMunicipioPorId ),
    check('estado', 'No es un id valido de estado').isMongoId(),
    check('estado').custom( existeEstadoPorId ),
    check('pais', 'No es un id valido de pais').isMongoId(),
    check('pais').custom( existePaisPorId ),
    check('correo', 'Correo incorrecto').isEmail(),
    check('canalDist').custom( validaCanalPorId ),
    check('vendedor').custom( validaVendedorPorId ),
    check('grupoCliente').custom( validaGrupoClientePorId ),
    validarCampos
], sociosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRol,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], sociosDelete);

// router.delete('/',sociosPatch);

module.exports = router;