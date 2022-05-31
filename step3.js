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
        return resp.data
    } catch(err) {
        console.log(err.response.status)
        console.log(err.response.statusText)
    }
}

function catWrite(path, file) {
    let content = fs.readFileSync(file).toString()
    fs.writeFile(path, content, 'utf8', (err) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log("Written Successfully")
    })
}

async function webCatWrite(path, url) {
    try {
        let content = await webCat(url)
        fs.writeFile(path, content, 'utf8', (err) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            console.log("Written Successfully")
        })
    } catch (err) {
        console.log(err.response.status)
        console.log(err.response.statusText)
    }
}

let arg1 = process.argv[2]

if (arg1.includes('http')) {
    webCat(arg1)
} else if (arg1 === '--out') {
    let arg2 = process.argv[3]
    let arg3 = process.argv[4]
    if(arg3.includes('http')) {
        webCatWrite(arg2, arg3)
    } else {
        catWrite(arg2, arg3)
    }
} else {
    cat(arg1)
}