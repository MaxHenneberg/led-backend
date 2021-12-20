// @ts-ignore
import ws281x from "rpi-ws281x";
import express from "express";
import RunningPixel from "./animations/RunningPixel";

const app = express()
const port = 3000

let currentInterval: NodeJS.Timer;

app.get('/', (req, res) => {
    if(currentInterval){
        clearInterval(currentInterval);
    }

    res.send('Hello World!')

})

app.listen(port, () => {
    const ledConfig = new LedConfig(25, 255)
    ws281x.configure(ledConfig);
    LedAnimation.configure(ledConfig)
    console.log(`Example app listening at http://localhost:${port}`)
})
