const charactersApi = require('../api/characters.api')

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: function (request, h) {
    
            return h.redirect('/'+process.env.SWAGGER_URL_BASE)
        }
    },
    {
        method: 'GET',
        path: '/characters',
        async handler(request, h) {
            return `ID: ALL`;
        }
    },
    {
        method: 'GET',
        path: '/characters/{id}',
        async handler(request, h) {
            const { id } = request.params
            return `ID: ${id}`;
        }
    }
]