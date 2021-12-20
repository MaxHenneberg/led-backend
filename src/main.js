const express = require('express')
const ws281x = require('rpi-ws281x')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
    ws281x.configure({leds:16});
    var pixels = new Uint32Array(16);
    ws281x.render(pixels);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
