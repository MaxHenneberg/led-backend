// @ts-ignore
import ws281x from "rpi-ws281x";
import {LedAnimation} from "./LedAnimation";
import {ColorUtils} from "./ColorUtils";

class Bouncing extends LedAnimation {
    currentFill = 0;
    fillTime = 800;
    emptyTime = 1600;
    color: number;
    red: number;
    green: number;
    blue: number;
    currentAnimation: Function;
    done: boolean;

    constructor(red: number, green: number, blue: number) {
        super();
        this.color = ColorUtils.toColor(red, green, blue);
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.currentAnimation = this.fillAnimation;
        this.done = false;
    }

    fillAnimation(): void {
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        if (this.currentFill < LedAnimation.ledConfig.leds) {
            this.currentFill = this.currentFill + 4;
            for (let i = 0; i < this.currentFill - 10; i++) {
                pixels[i] = this.color;
            }

            for (let i = 0; i < 4 && this.currentFill + i < LedAnimation.ledConfig.leds; i++) {
                const factor = (1 / (i + 2));
                pixels[this.currentFill + i] = (Math.round(this.red * factor) << 16) | (Math.round(this.green * factor) << 8) | Math.round(this.blue * factor);
            }

            ws281x.render(pixels);
        } else {
            this.currentAnimation = this.emptyAnimation;
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
            this.currentAnimation = null;
            this.done = true;
        }


    }

    public onClear() {
    }

    play() {
        this.currentAnimation();
        return this.done;
    }
}

export default Bouncing;
