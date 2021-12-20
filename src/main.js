const express = require('express')
const ws281x = require('rpi-ws281-x-native')
const app = express()
const port = 3000

const channel = ws281x(5, { stripType: 'ws2812' });

app.get('/', (req, res) => {
    res.send('Hello World!')
    const colorArray = channel.array;
    for (let i = 0; i < channel.count; i++) {
        colorsArray[i] = 0xffcc22;
    }
    ws281x.render();
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
