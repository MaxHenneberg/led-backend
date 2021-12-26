import {LedAnimation, LedConfig} from "./LedAnimation";
import {ColorUtils, RGB} from "./ColorUtils";
// @ts-ignore
import ws281x from "rpi-ws281x";

export class Snake extends LedAnimation {

    colors: RGB[];
    colorProgress: number;
    progress: number;

    direction: number;
    tailLength: number;

    constructor(colors: RGB[]) {
        super();
        this.colors = colors;
        this.colorProgress = 0;
        this.progress = 0;
        this.direction = 1;
        this.tailLength = 5;
    }

    public play(): boolean {
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        this.drawTail(pixels);
        ws281x.render(pixels);
        this.handleProgress();

        if (this.reachedDestination()) {
            this.colorProgress++;
            this.direction *= -1;
            return true;
        } else {
            return false;
        }
    }

    private drawTail(pixels: Uint32Array): void {
        for (let i = 0;
             i < this.tailLength &&
             (i * this.direction + this.progress) > 0 &&
             (i * this.direction + this.progress) < LedAnimation.ledConfig.leds; i++) {
            const currentPixel = (i * this.direction + this.progress);
            if (currentPixel > 0 && currentPixel < LedAnimation.ledConfig.leds) {
                pixels[currentPixel] = ColorUtils.RGBtoColor(this.colors[this.colorProgress % this.colors.length].fade((this.tailLength - i) / this.tailLength));
            } else {
                break;
            }
        }
    }

    private handleProgress(): void {
        this.progress += (this.direction)
    }

    private reachedDestination(): boolean {
        if (this.direction > 0) {
            return this.progress >= LedAnimation.ledConfig.leds
        } else {
            return this.progress <= 0;
        }
    }

    public onClear() {
    }

    public getTicks(): number {
        return LedAnimation.ledConfig.leds;
    }

}
