// @ts-ignore
import ws281x from "rpi-ws281x";
import express from "express";
import RunningPixel from "./animations/RunningPixel";
import {LedAnimation, LedConfig} from "./animations/LedAnimation";
import Bouncing from "./animations/Bouncing";

const app = express()
app.use(express.json())
const port = 3000
const bouncingAnimation = new Bouncing(144, 0, 0);


app.get('/animation/runningPixel', (req, res) => {
    res.send('Running Pixel')
    new RunningPixel().play()
})

app.get('/animation/bouncing', (req, res) => {
    res.send('Bouncing')
    setInterval(() => bouncingAnimation.play(), 2000);

})

app.post('/bpm', (req, res) => {
    const interval = Math.round(1000.0 * (60 / req.body.bpm));
    console.log(interval)
    setInterval(() => bouncingAnimation.play(), interval);
    res.send(req.body.bpm);
})

app.listen(port, () => {
    const ledConfig = new LedConfig(150, 255)
    ws281x.configure(ledConfig);
    LedAnimation.configure(ledConfig)
    console.log(`Example app listening at http://localhost:${port}`)
})
