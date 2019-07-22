require('dotenv').config()
const fsUtil = require('../extract-data/fileUtil')
const apiCharacter = require('../src/api/characters.api')
const MongoDB = require('./../src/db/strategies/mongodb/mongoDbStrategy')
const Context = require('./../src/db/strategies/base/contextStrategy')
const CharacterSchema = require('./../src/db/strategies/mongodb/schemas/CharacterSchema')

const sequentially = (λs) => {
	return λs.reduce((promise, λ, index) => {
		return promise.then((items) => {
			return Promise.resolve(λ(index))
				.then((item) => [ ...items, item ])
		});
	}, Promise.resolve([]));
}

async function main(){
    const characters = await fsUtil.getFile('db.json')
    const connection = MongoDB.connect()
    await new Context(new MongoDB(connection, CharacterSchema))
    const savedList = characters.map((ch) => async () =>{
        let saved = await apiCharacter.create(ch)
        console.log(`Saved: Name: ${saved.name}`)
        return saved
    })
    await sequentially(savedList)
    process.exit();
}

main()
