require('dotenv').config()
const fsUtil = require('../extract-data/fileUtil')
const apiCharacter = require('../src/api/characters.api')
const MongoDB = require('./../src/db/strategies/mongodb/mongoDbStrategy')
const Context = require('./../src/db/strategies/base/contextStrategy')
const CharacterSchema = require('./../src/db/strategies/mongodb/schemas/CharacterSchema')

async function main(){
    const characters = await fsUtil.getFile('db.json')
    const connection = MongoDB.connect()
    await new Context(new MongoDB(connection, CharacterSchema))
    const savedList = characters.map(async ch =>{
        let saved = await apiCharacter.create(ch)
        console.log(`Saved: Name: ${saved.name}`)
    })
    return;
}

main()
