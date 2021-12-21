// @ts-ignore
import ws281x from "rpi-ws281x";
import {LedAnimation} from "./LedAnimation";

class Bouncing extends LedAnimation {
    currentFill = 0;
    fillTime = 144;
    emptyTime = 288;
    color: number;

    constructor(red: number, green: number, blue: number) {
        super();
        this.color = (red << 16) | (green << 8) | blue;
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
                pixels[this.currentFill + i] = this.color * (1 / (i + 2))
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
                pixels[this.currentFill + i] = this.color * (1 / (i + 2))
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
