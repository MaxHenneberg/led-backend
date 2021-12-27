// @ts-ignore
import ws281x from "rpi-ws281x";
import express from "express";
import {LedAnimation, LedConfig} from "./animations/LedAnimation";
import Bouncing from "./animations/Bouncing";
import {RunningColor} from "./animations/RunningColor";
import {Pulse} from "./animations/Pulse";
import {ColorUtils, RGB} from "./animations/ColorUtils";
import {RunningPixel} from "./animations/RunningPixel";
import {AnimationPlayer} from "./animations/AnimationPlayer";
import {Snake} from "./animations/Snake";
import {SidePulse} from "./animations/SidePulse";

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
    animationPlayer.playInLoop(runningColor, 300);
});

app.get('/animation/blitz', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(155, 100, 0), ColorUtils.toColor(0, 0, 0)]);
    animationPlayer.playInLoop(runningColor, 300);
});

app.get('/animation/christmas', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(155, 0, 0), ColorUtils.toColor(0, 155, 0)]);
    animationPlayer.playInLoop(runningColor, 300);
});

app.get('/animation/christmas', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(155, 0, 0), ColorUtils.toColor(0, 155, 0)]);
    animationPlayer.playInLoop(runningColor, 300);
});

app.get('/animation/dechiColor', (req, res) => {
    res.send('Running Pixel')
    const runningColor = new RunningColor(200, [ColorUtils.toColor(255, 0, 0), ColorUtils.toColor(0, 255, 0)]);
    runningColor.setNewColors([ColorUtils.toColor(155, 0, 0), ColorUtils.toColor(155, 100, 0), ColorUtils.toColor(69, 67, 67)]);
    animationPlayer.playInLoop(runningColor, 300);
});

app.get('/animation/bouncing', (req, res) => {
    res.send('Bouncing')
    const bouncingAnimation = new Bouncing(144, 0, 0);
    animationPlayer.playInLoop(bouncingAnimation, 2000);
});

app.post('/bpm', (req, res) => {
    const interval = Math.round(1000.0 * (60 / req.body.bpm));
    console.log(interval)
    const pulse = new Pulse([new RGB(70, 0, 0), new RGB(70, 70, 0), new RGB(0, 70, 0),new RGB(0, 70, 70), new RGB(0, 0, 70)]);
    animationPlayer.repeatAnimation(pulse, interval * 0.8, interval);
    res.sendStatus(200);
});

app.post('/bpmLoudness', (req, res) => {
    const interval = Math.round(1000.0 * (60 / req.body.bpm));
    const loudness = req.body.loudness;
    const loudnessPercentage = Math.max(0.1, (20 + loudness))/20
    console.log(interval)
    const sidePulse = new SidePulse([new RGB(70, 0, 0), new RGB(70, 70, 0), new RGB(0, 70, 0),new RGB(0, 70, 70), new RGB(0, 0, 70)], loudnessPercentage * 77);
    animationPlayer.repeatAnimation(sidePulse, interval * 0.8, interval);
    res.sendStatus(200);
});


app.post('/bpmSnake', (req, res) => {
    const interval = Math.round(1000.0 * (60 / req.body.bpm));
    console.log(interval)
    const snake = new Snake([new RGB(130, 0, 0), new RGB(0, 130, 0)]);
    animationPlayer.repeatAnimation(snake, interval * 0.8, interval);
    res.sendStatus(200);
});

app.get('/animation/pulse', (req, res) => {
    res.send(req.body)
    const pulse = new Pulse([new RGB(130, 0, 0), new RGB(0, 130, 0)]);
    animationPlayer.playInLoop(pulse, 300);
});

app.listen(port, () => {
    ws281x.configure(ledConfig);
    console.log(`Example app listening at http://localhost:${port}`)
})
