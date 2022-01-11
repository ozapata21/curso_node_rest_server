const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:           '/api/auth',
            buscar:         '/api/buscar',
            categorias:     '/api/categorias',
            canalDists:     '/api/canaldists',
            clasePedidos:   '/api/clasepedidos',
            grupoClientes:  '/api/grupoclientes',
            items:          '/api/items',
            orders:         '/api/orders',
            orgVentas:      '/api/orgventas',
            roles:          '/api/roles',
            socios:         '/api/socios',
            sector:         '/api/sectores',
            usuarios:       '/api/usuarios',
            vendedores:     '/api/vendedores'
        }
        
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
        this.app.use(this.paths.auth,           require('../routes/auth'));
        this.app.use(this.paths.buscar,         require('../routes/buscar'));
        this.app.use(this.paths.categorias,     require('../routes/categorias'));
        this.app.use(this.paths.clasePedidos,   require('../routes/clasepedidos'));
        this.app.use(this.paths.canalDists,     require('../routes/canaldists'));
        this.app.use(this.paths.grupoClientes,  require('../routes/grupoclientes'));
        this.app.use(this.paths.items,          require('../routes/items'));
        this.app.use(this.paths.orders,         require('../routes/orders'));
        this.app.use(this.paths.orgVentas,      require('../routes/orgventas'));
        this.app.use(this.paths.roles,          require('../routes/roles'));
        this.app.use(this.paths.socios,         require('../routes/socios'));
        this.app.use(this.paths.sector,         require('../routes/sectores'));
        this.app.use(this.paths.usuarios,       require('../routes/usuarios'));
        this.app.use(this.paths.vendedores,     require('../routes/vendedores'));
    
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Poceso corriendo en puerto',this.port);
        })
    }
}

module.exports = Server;