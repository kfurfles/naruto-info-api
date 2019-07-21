const fsUtil = require('./fileUtil.js')
const { getPage } = require('./requestUtils.js')

const BASE_URL = 'https://naruto.fandom.com'

async function main() {
    var initialPage = BASE_URL+'/wiki/Category:Characters'
    var dom = await getPage(initialPage)
    getCharacterList(dom)  
}


async function getCharacterList(dom){
    var list = [...dom.window.document.querySelectorAll('.category-page__members-for-char li a')]
            .map(el =>{
                return {
                    name: el.textContent,
                    url: BASE_URL+el.href
                }
        })
    await fsUtil.concatList('characters-list.json',list)
    var nextPage = hasNextPage(dom)
    if(nextPage){
        var response = await getPage(nextPage)
        getCharacterList(response)
    } else {
        return fsUtil.getFile('characters-list.json')
    }
}

function hasNextPage(dom){
    var nextPage = dom.window.document.querySelector('.category-page__pagination-next')
    if(nextPage){
        return nextPage.href
    } else {
        return false
    }
}


main()