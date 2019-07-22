const HapiSwagger = require('hapi-swagger')

const swaggerConfig = {
    info: {
        title: '#Naruto Catalog Characters',
        version: 'v1.0'
    },
    lang: 'pt'
}

module.exports = {
    plugin: HapiSwagger,
    options: swaggerConfig
}