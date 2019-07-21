const fsUtil = require('./fileUtil.js')
const { getPage } = require('./requestUtils.js')

const sequentially = (λs) => {
	return λs.reduce((promise, λ, index) => {
		return promise.then((items) => {
			return Promise.resolve(λ(index))
				.then((item) => [ ...items, item ])
		});
	}, Promise.resolve([]));
}

async function main() {
    let list = await fsUtil.getFile('characters-list.json')
    let toDo = list.map((ch,idx) => async () =>{
        let dom = await getPage(ch.url)
        const data = await segregationData(dom)
        data['name'] = ch.name
        fsUtil.addData('db.json',data)
        console.log(`${idx++} | Character: ${ch.name}`)
    })

    sequentially(toDo)
    // console.log(typeof [0])
}

async function segregationData(dom){
    var thList = [...dom.window.document.querySelectorAll('table.type-character > tbody > tr >th')].slice(2)
    var heads = {};
    var actualHead = '';
    thList.map((th,idx) => {
        let actual = th.innerHTML.split('\n').join('').trim().replace(' ','').toLowerCase()
        if(!actualHead && th.classList.contains('mainheader')){
            actualHead = actual
        } else if(actualHead && th.classList.contains('mainheader')){
            actualHead = actual
        } else{
            var data = { info: actual, data: stripHtml(dom,getContent(th).split('\n').join('').trim()) }
            if(heads[actualHead] && heads[actualHead].hasOwnProperty('length')){
                heads[actualHead].push(data)
            } else{
                heads[actualHead] = [data]
            }	
        }
    })
    return heads
}

function getContent(th){
    return th.parentNode.querySelector('td').textContent
}

function stripHtml(dom, html){
    var temporalDivElement = dom.window.document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || ""
}

main()
    
