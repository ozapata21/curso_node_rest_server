const { Schema, model} = require('mongoose');

const SectoreSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El monbre es obligatorio'],
        unique: true
    },
    activo: {
        type: Boolean,
        default:true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true        
    }
})

SectoreSchema.methods.toJSON = function(){
    const { __v,activo, ...data } = this.toObject();
    return data;
}

module.exports = model('Sectore', SectoreSchema);