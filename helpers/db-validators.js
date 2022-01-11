const ObjectId = require('mongoose').Types.ObjectId;
const { 
    Categoria,
    CanalDist, 
    ClasePedido,
    Estado, 
    GrupoCliente, 
    Item, 
    Municipio, 
    Order,
    OrgVenta, 
    Paise,
    Role, 
    Socio, 
    Sectore,
    Usuario,
    Vendedore,
} = require('../models'); 

const esRoleValido = async(rol='') => {
    console.log(rol);
    const existeRol = await Role.findOne({rol});
    console.log(existeRol);
    if (!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`)
    }
}

const existeEmail = async(correo ='') => {
    const existe = await Usuario.findOne({correo})
    if(existe){
        throw new Error(`El correo: ${ correo } ya existe`)
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`No existe id del usuario ${id}`);
    }
}

const existeRFC = async ( rfc ) =>{
    const existeSocio = await Socio.findOne( { rfc: rfc } );
    if( existeSocio ){
        throw new Error(`El RFC: ${rfc} ya existe `);
    }
}

const existeCategoriaPorId = async( id ) => {
    const existeCategoria = await Categoria.findById( id );
    if( !existeCategoria ){
        throw new Error(`No existe id de la categoria ${id}`);
    }
}

const existeItemPorId = async( id ) => {
    const existeItem = await Item.findById( id );
    if( !existeItem ){
        throw new Error(`No existe id del item ${id}`);
    }
}

const existeEstadoPorId = async( id ) => {
    const existeEstado = await Estado.findById( id );
    if( !existeEstado ){
        throw new Error(`No existe id del estado ${id}`);
    }
}

const existeMunicipioPorId = async( id ) => {
    const existeMunicipo = await Municipio.findById( id );
    if( !existeMunicipo ){
        throw new Error(`No existe id del Municipio ${id}`);
    }
}

const existePaisPorId = async( id ) => {
    const existePais = await Paise.findById( id );
    if( !existePais ){
        throw new Error(`No existe id del Pais ${id}`);
    }
}

const existeSocioPorId = async( id ) => {
    const existeSocio = await Socio.findById( id );
    if( !existeSocio ){
        throw new Error(`No existe id del Socio ${id}`);
    }
}

const existeOrderPorId = async( id ) => {
    const existeOrder = await Order.findById( id );
    if( !existeOrder ){
        throw new Error(`No existe id de la orden ${id}`);
    }
}


const existeCanalDistPorId = async( id ) => {
    const existeCanalDist = await CanalDist.findById( id );
    if( !existeCanalDist ){
        throw new Error(`No existe id del canal de dist ${id}`);
    }
}

const existeClasePedidoPorId = async( id ) => {
    const existeClasePedido = await ClasePedido.findById( id );
    if( !existeClasePedido ){
        throw new Error(`No existe id de la clase de pedido ${id}`);
    }
}

const existeGrupoClientePorId = async( id ) => {
    const existeGrupoCliente = await GrupoCliente.findById( id );
    if( !existeGrupoCliente ){
        throw new Error(`No existe id del grupo de cliente de dist ${id}`);
    }
}
const existeOrgVentaPorId = async( id ) => {
    const existeOrgVenta = await OrgVenta.findById( id );
    if( !existeOrgVenta ){
        throw new Error(`No existe la organizacion de ventas ${id}`);
    }
}
const existeRolePorId = async( id ) => {
    const existeRol = await Role.findById( id );
    if( !existeRol ){
        throw new Error(`No existe id del Rol: ${id}`);
    }
}
const existeSectorePorId = async( id ) => {
    const existeSectore = await Sectore.findById( id );
    if( !existeSectore ){
        throw new Error(`No existe id del sector ${id}`);
    }
}

const existeVendedorPorId = async( id ) => {
    const existeVendedor = await Vendedore.findById( id );
    if( !existeVendedor ){
        throw new Error(`No existe id del vendedor ${id}`);
    }
}

const validaCanalPorId = async( id ) => {
    if(id) {
        const mongoid = ObjectId.isValid(id);
        if(mongoid) {
            const existeCanalDist = await CanalDist.findById( id );
            if( !existeCanalDist ){
                throw new Error(`No existe id del canal de dist ${id}`);
            }
        }
        else {
            throw new Error(`No es un id valido del canal de dist ${id}`);
        }
    }
}

const validaGrupoClientePorId = async( id ) => {
    if(id) {
        const mongoid = ObjectId.isValid(id);
        if(mongoid) {
            const existeGrupoCliente = await GrupoCliente.findById( id );
            if( !existeGrupoCliente ){
                throw new Error(`No existe id del grupo de cliente ${id}`);
            }
        }
        else {
            throw new Error(`No es un id valido del grupo de cliente ${id}`);
        }
    }
}
const validaVendedorPorId = async( id ) => {
    if(id) {
        const mongoid = ObjectId.isValid(id);
        if(mongoid) {
            const existeVendedor = await Vendedore.findById( id );
            if( !existeVendedor ){
                throw new Error(`No existe id del vendedor ${id}`);
            }
        }
        else {
            throw new Error(`No es un id valido del vendedor ${id}`);
        }
    }
}


module.exports = {
    existeClasePedidoPorId,
    existeCanalDistPorId,
    existeCategoriaPorId,
    existeEstadoPorId,
    existeEmail,
    existeGrupoClientePorId,
    existeItemPorId,
    existeMunicipioPorId,
    existeOrderPorId,
    existePaisPorId,
    existeRolePorId,
    existeRFC,
    existeSocioPorId,
    existeUsuarioPorId,
    esRoleValido,
    existeVendedorPorId,
    validaCanalPorId,
    validaGrupoClientePorId,
    existeOrgVentaPorId, 
    existeSectorePorId,
    validaVendedorPorId
}