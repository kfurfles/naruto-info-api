const ICrud = require('../base/interfaceDb')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}
class MongoDB extends ICrud {
    // 3o
    constructor(connection, schema) {
        super()
        // 4o
        this._connection = connection;
        this._collection = schema;
    }
    // 2o
    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }
     // 1o 
    static connect() {
        Mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_COLLECTION}`, {
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        })
        const connection = Mongoose.connection
        connection.once('open', () => console.log('database rodando!!'))
        return connection;
    }
}

module.exports = MongoDB