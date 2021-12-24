// @ts-ignore
import ws281x from "rpi-ws281x";
import express from "express";
import {LedAnimation, LedConfig} from "./animations/LedAnimation";
import Bouncing from "./animations/Bouncing";
import {RunningColor} from "./animations/RunningColor";
import {Pulse} from "./animations/Pulse";
import {ColorUtils} from "./animations/ColorUtils";
import {RunningPixel} from "./animations/RunningPixel";
import {AnimationPlayer} from "./animations/AnimationPlayer";

const app = express()
app.use(express.json())
const port = 3000
const ledConfig = new LedConfig(150, 255);
LedAnimation.configure(ledConfig);

const animationPlayer = new AnimationPlayer();
// const bouncingAnimation = new Bouncing(144, 0, 0);
// const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
// const pulse = new Pulse(255, 0, 0);

app.get('/animation/runningPixel', (req, res) => {
    res.send('Running Pixel')
    new RunningPixel().play();
});

app.get('/animation/christmasTree', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(80, 15, 102), ColorUtils.toColor(80, 15, 102), ColorUtils.toColor(84, 84, 84), ColorUtils.toColor(84, 84, 84)]);
    animationPlayer.playInLoop(runningColor, 100);
});

app.get('/animation/blitz', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(155, 100, 0), ColorUtils.toColor(0, 0, 0)]);
    animationPlayer.playInLoop(runningColor, 100);
});

app.get('/animation/christmas', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(155, 0, 0), ColorUtils.toColor(0, 155, 0)]);
    animationPlayer.playInLoop(runningColor, 100);
});

app.get('/animation/christmas', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(155, 0, 0), ColorUtils.toColor(0, 155, 0)]);
    animationPlayer.playInLoop(runningColor, 100);
});

app.get('/animation/dechiColor', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(155, 0, 0), ColorUtils.toColor(155, 100, 0), ColorUtils.toColor(69, 67, 67)]);
    animationPlayer.playInLoop(runningColor, 100);
});

app.get('/animation/bouncing', (req, res) => {
    res.send('Bouncing')
    const bouncingAnimation = new Bouncing(144, 0, 0);
    animationPlayer.playInLoop(bouncingAnimation, 2000);
});

app.post('/bpm', (req, res) => {
    const interval = Math.round(1000.0 * (60 / req.body.bpm));
    console.log(interval)
    const pulse = new Pulse(255, 0, 0);
    animationPlayer.playInLoop(pulse, interval);
    res.send(req.body.bpm);
});

app.get('/animation/pulse', (req, res) => {
    res.send(req.body)
    const red = req.body.red;
    const green = req.body.green;
    const blue = req.body.blue;
    const pulse = new Pulse(255, 0, 0);
    pulse.setColor(red, green, blue);
    animationPlayer.playInLoop(pulse, 100);
});

app.listen(port, () => {
    ws281x.configure(ledConfig);
    console.log(`Example app listening at http://localhost:${port}`)
})
