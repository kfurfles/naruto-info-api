const CharactersDB = require('../db/strategies/mongodb/schemas/CharacterSchema')

module.exports ={
    async listAll(params){
        return await CharactersDB.find(params)
    },
    async create(chr){
        let newChr = new CharactersDB(chr)
        return newChr.save()
    }
}