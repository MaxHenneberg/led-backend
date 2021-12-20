// @ts-ignore
import ws281x from "rpi-ws281x";
import {LedAnimation} from "./LedAnimation";

class RunningPixel extends LedAnimation {
    currentPixel = 0;
    currentX = 0.0

    constructor() {
        super();
    }

    animation(): void {
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);

        this.currentX = (this.currentX + 0.2) % Math.PI;
        this.currentPixel = (this.currentPixel + 1) % LedAnimation.ledConfig.leds;
        const red = Math.sin(this.currentX) * LedAnimation.ledConfig.brightness,
            green = Math.sin((this.currentX + 0.5) % Math.PI) * LedAnimation.ledConfig.brightness,
            blue = Math.sin((this.currentX + 1.0) % Math.PI) * LedAnimation.ledConfig.brightness;
        pixels[this.currentPixel] = (red << 16) | (green << 8) | blue;


        ws281x.render(pixels);
    }
}

export default RunningPixel;
