const { Schema, model } = require('mongoose');

const SocioSchema = Schema({
    rfc: {
        type: String,
        required: [true, 'El RFC es obligatoio'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatoio']
    },
    calle: {
        type: String,
        required: [true, 'La calle es obligatoio']
    },
    numeroExt: {
        type: String,
        required: [true, 'El numero es obligaroio']
    },
    numeroInt: {
        type: String
    },
    activo: {
        type: Boolean,
        default: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatoio'],
        unique: true
    }
})

SocioSchema.methods.toJSON = function(){
    const { __v, _id, ...socio } = this.toObject();
    socio.uid = _id
    return socio;
}


module.exports = model('Socio', SocioSchema);