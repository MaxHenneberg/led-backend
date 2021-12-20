// @ts-ignore
import ws281x from "rpi-ws281x";
import express from "express";
import RunningPixel from "./animations/RunningPixel";
import {LedAnimation, LedConfig} from "./animations/LedAnimation";

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
    new RunningPixel().play()
})

app.listen(port, () => {
    const ledConfig = new LedConfig(25, 255)
    ws281x.configure(ledConfig);
    LedAnimation.configure(ledConfig)
    console.log(`Example app listening at http://localhost:${port}`)
})
