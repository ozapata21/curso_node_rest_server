mongoose = require('mongoose');

const dbConection = async()=>{
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useUnifiedTopology: true

        });

        console.log('Base de datos on line');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conecion');
    }
}

module.exports = {
    dbConection
}

