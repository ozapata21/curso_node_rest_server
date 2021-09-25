const { Schema, model} = require('mongoose');
const { updateMany } = require('./order');

const ItemSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El monbre es obligatorio'],
        unique: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required:true
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

ItemSchema.methods.toJSON = function(){
    const { __v,activo, ...data } = this.toObject();
    return data;
}

module.exports = model('Item', ItemSchema);


// udm
// sector
// pesoBruto
// pesoNeto
// unidadDePeso
// codigoBarras
