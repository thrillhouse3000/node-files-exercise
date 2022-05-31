const fs = require('fs')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error...', err)
            process.exit(1)
        }
        console.log(data)
    })
}

async function webCat(url) {
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    } catch(err) {
        console.log(err.response.status)
        console.log(err.response.statusText)
    }
}

let arg = process.argv[2]
if(arg.includes('http')) {
    webCat(arg)
} else {
    cat(arg)
}