const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';
        
        //Cnectar a base de datos
        this.conectaDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
        
    }

    async conectaDB() {
        await dbConection();
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
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Poceso corriendo en puerto',this.port);
        })
    }
}

module.exports = Server;