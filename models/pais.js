const { Schema, model} = require('mongoose');

const PaiseSchema = Schema({
    id: {
        type:String,
        required: [true, 'El id es requerido']
    },
    pais: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})


module.exports = model('Paise', PaiseSchema);