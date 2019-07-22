const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const swaggerOptions = require('./swagger')
const MongoDB = require('./../db/strategies/mongodb/mongoDbStrategy')
const Context = require('./../db/strategies/base/contextStrategy')
const CharacterSchema = require('./../db/strategies/mongodb/schemas/CharacterSchema')


const routes = require('./../controles')

module.exports = async (server) =>{
    mapRoutes(server,routes)
    registerDB()
    await server.register(reducePlugins())
}

function mapRoutes(server,routes){
    routes.map(r => server.route(r))
}

function reducePlugins(){
    return [
        Inert,
        Vision,
        swaggerOptions
    ]
}

function registerDB(){
    const connection = MongoDB.connect()
    new Context(new MongoDB(connection, CharacterSchema))
}