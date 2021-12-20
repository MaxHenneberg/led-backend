const express = require('express')
const ws281x = require('rpi-ws281x')
const app = express()
const port = 3000
config = {};
config.leds = 5;
config.brightness = 255;
config.gpio = 18
ws281x.configure(config);

app.get('/', (req, res) => {
    res.send('Hello World!')
    setInterval((() => loop()), 100);
})


offset = 0;
function loop() {
    var pixels = new Uint32Array(config.leds);

    // Create a fill color with red/green/blue.
    var red = 255, green = 0, blue = 0;
    var color = (red << 16) | (green << 8)| blue;
    offset = (offset+1)%config.leds;
    pixels[offset] = color;

    ws281x.render(pixels);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
