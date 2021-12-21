// @ts-ignore
import ws281x from "rpi-ws281x";
import {LedAnimation} from "./LedAnimation";

class Bouncing extends LedAnimation {
    currentFill = 0;
    fillTime = 800;
    emptyTime = 1600;
    color: number;
    red: number;
    green: number;
    blue: number;

    constructor(red: number, green: number, blue: number) {
        super();
        this.color = (red << 16) | (green << 8) | blue;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    animation(): void {
    }

    fillAnimation(): void {
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        if (this.currentFill < LedAnimation.ledConfig.leds) {
            this.currentFill = this.currentFill + 4;
            for (let i = 0; i < this.currentFill; i++) {
                pixels[i] = this.color;
            }

            for (let i = 0; i < 4 && this.currentFill + i < LedAnimation.ledConfig.leds; i++) {
                const factor = (1 / (i + 2));
                pixels[this.currentFill + i] = (Math.round(this.red * factor) << 16) | (Math.round(this.green * factor) << 8) | Math.round(this.blue * factor);
            }

            ws281x.render(pixels);
        } else {
            LedAnimation.clearCurrentAnimation();
            LedAnimation.currentAnimation = setInterval((() => this.emptyAnimation()), Math.round(this.emptyTime / LedAnimation.ledConfig.leds));
        }


    }

    emptyAnimation(): void {
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        if (this.currentFill > 0) {
            this.currentFill = this.currentFill - 2;
            for (let i = 0; i < this.currentFill; i++) {
                pixels[i] = this.color;
            }

            for (let i = 0; i < 4 && this.currentFill + i < LedAnimation.ledConfig.leds; i++) {
                const factor = (1 / (i + 2));
                pixels[this.currentFill + i] = (Math.round(this.red * factor) << 16) | (Math.round(this.green * factor) << 8) | Math.round(this.blue * factor);
            }

            ws281x.render(pixels);
        } else {
            LedAnimation.clearCurrentAnimation();
        }


    }

    play() {
        LedAnimation.clearCurrentAnimation();
        LedAnimation.currentAnimation = setInterval((() => this.fillAnimation()), Math.round(this.fillTime / LedAnimation.ledConfig.leds));
    }
}

export default Bouncing;
