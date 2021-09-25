const { Schema, model} = require('mongoose');

const EstadoSchema = Schema({
    id: {
        type: String,
        require: [true, 'El id del estado es obligatorio'],
        unique: true
    },
    nombre: {
        type: String,
        require: [true, 'El nombre del estado es obligatorio'],
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

EstadoSchema.methods.toJSON = function(){
    const { __v,activo, ...data } = this.toObject();
    return data;
}

module.exports = model('Estado', EstadoSchema);