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
        required: [true, 'La calle es obligatoia']
    },
    numeroExt: {
        type: String,
        required: [true, 'El numero es obligaroio']
    },
    numeroInt: {
        type: String
    },
    colonia: {
        type: String
    },
    localidad: {
        type: String,
        required: [true, 'La localidad es obligatoria']
    },
    municipio: {
        type: Schema.Types.ObjectId,
        ref: 'Municipio',
        required:true  
    },
    estado: {
        type: Schema.Types.ObjectId,
        ref: 'Estado',
        required:true  
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required:true  
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatoio'],
    },
    telefono: {
        type: String
    },
    cp: {
        type: String
    },
    canalDist: {
        type: Schema.Types.ObjectId,
        ref: 'Canal'
    },
    grupoCliente: {
        type: Schema.Types.ObjectId,
        ref: 'GrupoCliente'
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendedor'
    },
    condicionPago: {
        type: Number,
    },
    cuentasBancarias: [{
        banco: {
            type: String
        },
        cuenta: {
            type: String
        }
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true  
    },
    fechaMod: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true
    }
})

SocioSchema.methods.toJSON = function(){
    const { __v, _id, ...socio } = this.toObject();
    socio.uid = _id
    return socio;
}

module.exports = model('Socio', SocioSchema);

