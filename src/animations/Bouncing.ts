// @ts-ignore
import ws281x from "rpi-ws281x";
import {LedAnimation} from "./LedAnimation";

class Bouncing extends LedAnimation {
    currentFill = 0;
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
            this.currentFill++;
            for (let i = 0; i < this.currentFill; i++) {
                pixels[i] = this.color;
            }

            ws281x.render(pixels);
        } else {
            LedAnimation.clearCurrentAnimation();
            LedAnimation.currentAnimation = setInterval((() => this.emptyAnimation()), 100);
        }


    }

    emptyAnimation(): void {
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        if (this.currentFill > 0) {
            this.currentFill--;
            for (let i = 0; i < this.currentFill; i++) {
                pixels[i] = this.color;
            }

            ws281x.render(pixels);
        } else {
            LedAnimation.clearCurrentAnimation();
        }


    }

    play() {
        LedAnimation.clearCurrentAnimation();
        LedAnimation.currentAnimation = setInterval((() => this.fillAnimation()), 20);
    }
}

export default Bouncing;
