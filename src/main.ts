// @ts-ignore
import ws281x from "rpi-ws281x";
import express from "express";
import RunningPixel from "./animations/RunningPixel";
import {LedAnimation, LedConfig} from "./animations/LedAnimation";
import Bouncing from "./animations/Bouncing";
import {RunningColor} from "./animations/RunningColor";
import {Utils} from "./animations/Utils";

const app = express()
app.use(express.json())
const port = 3000
const ledConfig = new LedConfig(150, 255);
LedAnimation.configure(ledConfig);
const bouncingAnimation = new Bouncing(144, 0, 0);
const runningColor = new RunningColor(200, [Utils.toColor(255, 0, 0), Utils.toColor(0, 255, 0)]);


app.get('/animation/runningPixel', (req, res) => {
    res.send('Running Pixel')
    new RunningPixel().play();
});

app.get('/animation/blitz', (req, res) => {
    res.send('Running Pixel')
    runningColor.setNewColors([Utils.toColor(155, 100, 0), Utils.toColor(0, 0, 0)]);
    runningColor.play();
});

app.get('/animation/christmas', (req, res) => {
    res.send('Running Pixel')
    runningColor.setNewColors([Utils.toColor(155, 0, 0), Utils.toColor(0, 155, 0)]);
    runningColor.play();
});

app.get('/animation/christmas', (req, res) => {
    res.send('Running Pixel')
    runningColor.setNewColors([Utils.toColor(155, 0, 0), Utils.toColor(0, 155, 0)]);
    runningColor.play();
});

app.get('/animation/dechiColor', (req, res) => {
    res.send('Running Pixel')
    runningColor.setNewColors([Utils.toColor(155, 0, 0), Utils.toColor(155, 100, 0), Utils.toColor(69, 67, 67)]);
    runningColor.play();
});

app.get('/animation/bouncing', (req, res) => {
    res.send('Bouncing')
    setInterval(() => bouncingAnimation.play(), 2000);

});

app.post('/bpm', (req, res) => {
    const interval = Math.round(1000.0 * (60 / req.body.bpm));
    console.log(interval)
    runningColor.setInterval(interval);
    //test
    runningColor.setNewColors([Utils.toColor(155, 100, 0), Utils.toColor(0, 0, 0)]);
    runningColor.play();
    res.send(req.body.bpm);
});

app.listen(port, () => {
    ws281x.configure(ledConfig);
    console.log(`Example app listening at http://localhost:${port}`)
})
