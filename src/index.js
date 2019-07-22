require('dotenv').config()
const server = require('./server')
const setConfig = require('./config')
const open = require('open')

const init = async () => {
    await setConfig(server)
    await server.start();
    console.log('Server running on %s', server.info.uri);
    console.log('Swagger on %s', server.info.uri+`/${process.env.SWAGGER_URL_BASE}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init()