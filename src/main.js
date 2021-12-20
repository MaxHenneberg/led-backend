const express = require('express')
const ws281x = require('rpi-ws281x')
const app = express()
const port = 3000
config = {};
config.leds = 25;
config.brightness = 255;
config.gpio = 18
ws281x.configure(config);

app.get('/', (req, res) => {
    res.send('Hello World!')
    setInterval((() => loop()), 100);
})


offset = 0;
x = 0.0;
maxColor = 255;
function loop() {
    var pixels = new Uint32Array(config.leds);

    // Create a fill color with red/green/blue.
    var red = Math.sin(x)*maxColor, green = Math.sin((x+0.5)%Math.PI)*maxColor, blue = Math.sin((x+1)%Math.PI)*maxColor;
    var color = (red << 16) | (green << 8) | blue;
    offset = (offset + 1) % config.leds;
    x = (x + 0.2) % (Math.PI)
    pixels[offset] = color;

    ws281x.render(pixels);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
