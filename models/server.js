const express = require('express')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
        
    }

    middlewares(){

        // Uso de cors
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());
        
        //Ruta estatica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/user'));

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Poceso corriendo en puerto',this.port);
        })
    }
}

module.exports = Server;