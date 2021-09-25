const { Schema, model } = require('mongoose');

// const OrderLineSchema = Schema({
//     item: {
//         type: Schema.Types.ObjectId,
//         ref: 'Item',
//         required: [true, 'El material o servicio es obligatorio'],
//     },
//     cantidad: {
//         type: Number,
//         required:true
//     },
//     precio: {
//         type: Number,
//         required:true        
//     }
// })

// const OrderSchema = Schema({
//     socio: {
//         type: Schema.Types.ObjectId,
//         ref: 'Socio',
//         required: [true, 'El socio es obligatorio']
//     },
//     fecha: {
//         type: Date,
//         default:Date.now
//     },    
//     usuario: {
//         type: Schema.Types.ObjectId,
//         ref: 'Usuario',
//         required:true        
//     },
//     activo:{
//         type:Boolean,
//         default:true
//     },
//     orderLine:[OrderLineSchema]
// })

const OrderSchema = Schema({
    clasePedido: {
        type: Schema.Types.ObjectId,
        required: [true, 'La clase de pedido es obligatoria']
    },
    organizacionVentas: {
        type: Schema.Types.ObjectId,
        required: [true, 'La organizacion de ventas es obligatoria']
    },
    canalDist: {
        type: Schema.Types.ObjectId,
        required: [true, 'El canal de distribucion es obligatorio']
    },
    sector: {
        type: Schema.Types.ObjectId,
        required: [true, 'El sector es obligatorio']
    },
    solicitante: {
        type: Schema.Types.ObjectId,
        ref: 'Socio',
        required: [true, 'El solicitante es obligatorio']
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'Socio',
        required: [true, 'El destinatario es obligatorio']
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendedor'
    },
    oc: {
        type: String,        
    },
    fechaSurt: {
        type: Date,
        required:true
    }, 
    condicionPago: {
        type: Number,
    },
    fecha: {
        type: Date,
        default:Date.now
    },    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true        
    },
    activo:{
        type:Boolean,
        default:true
    },
    orderLine:[{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
            required: [true, 'El material o servicio es obligatorio'],
        },
        descripcion: {
            type: String
        },
        cantidad: {
            type: Number,
            required:true
        },
        precio: {
            type: Number,
            required:true        
        }
    }]
})

module.exports = model('Order', OrderSchema);
