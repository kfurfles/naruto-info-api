const { exists, promises: { writeFile, readFile } } = require('fs');

const existsAsync = (parametro) => new Promise((resolve, reject) => {
    exists(parametro, existe => resolve(existe))
})

async function getFile(fileName){
    if(! await existsAsync(fileName)){
            return [];
    }
    const text = await readFile(fileName);
    return JSON.parse(text);
}

async function writeData(fileName,text) {
    const dadoTexto = JSON.stringify(text);
    await writeFile(fileName, dadoTexto);
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