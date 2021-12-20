const express = require('express')
const ws281x = require('rpi-ws281x')
const app = express()
const port = 3000
config = {};
this.config.leds = 5;
this.config.brightness = 255;
this.config.gpio = 18
ws281x.configure(config);

app.get('/', (req, res) => {
    res.send('Hello World!')
    var pixels = new Uint32Array(5);
    ws281x.render(pixels);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
