const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatoio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatoio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    imagen: {
        type: String,
    },
    rol: {
        type: String,
        required:true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        img: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const { __v,password,_id,...usuario } = this.toObject();
    usuario.uid = _id
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);