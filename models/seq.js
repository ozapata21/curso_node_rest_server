const { Schema, model} = require('mongoose');

const SeqDMSchema = Schema({
    name: {
        type: String
    },
    seq: {
        type: Number
    }
})

module.exports = model('SeqDM', SeqDMSchema);