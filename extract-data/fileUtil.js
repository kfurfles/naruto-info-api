const { exists, promises: { writeFile, readFile } } = require('fs');
const path = require('path')
const existsAsync = (parametro) => new Promise((resolve, reject) => {
    exists(parametro, existe => resolve(existe))
})

const file = (str) => path.resolve(__dirname,'files',str)
async function getFile(fileName){
    if(! await existsAsync(file(fileName))){
            return [];
    }
    const text = await readFile(file(fileName));
    return JSON.parse(text);
}

async function writeData(fileName,text) {
    const dadoTexto = JSON.stringify(text);
    await writeFile(file(fileName), dadoTexto);
    return;
}

async function concatList(fileName, text){
    try {
        const list = await getFile(fileName)
        list.push(...text)
        await writeData(fileName, list)
    } catch (error) {
        console.log('errors: ',error)
    }
}

async function addData(fileName, text){
    __dirname
    try {
        const list = await getFile(fileName)
        list.push(text)
        await writeData(fileName, list)
    } catch (error) {
        console.log('errors: ',error)
    }
}

module.exports = {
    addData, getFile, writeData, concatList
}