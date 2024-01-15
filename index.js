const { createServer } = require('http')
const { readFileSync } = require('fs')

createServer((req, res) => {
    console.log(req.url)
    let file = ""

    switch (req.url) {
        case "/sketch.js":
            file = "sketch.js"
            break
        case "/p5.js":
            file = "p5.js"
            break
        default:
            file = "index.html"
    }

    console.log(file)
    res.write(readFileSync(file))
    res.end()
}).listen(6969)
