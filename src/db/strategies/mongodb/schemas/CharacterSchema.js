const Mongoose=  require('mongoose')
const characterSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    debut: [],
    voiceactors: [],
    personal: [],
    rank: [],
})

//mocha workaround
module.exports = Mongoose.model('characters', characterSchema)