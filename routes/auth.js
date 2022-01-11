const { Router } = require('express');
const { check } = require('express-validator'); 

const { validarJWT } = require('../middlewares/validar-jwt')

const { login, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


router.get('/renew',[
    validarJWT,
    validarCampos
], revalidarToken);


module.exports = router;