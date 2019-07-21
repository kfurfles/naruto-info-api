const axios = require('axios')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function getPage(url){
    var response = await axios.get(url)
    const dom = new JSDOM(response.data)
    return dom
}

module.exports = {
    getPage
}