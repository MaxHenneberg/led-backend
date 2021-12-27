import {LedAnimation, LedConfig} from "./LedAnimation";
import {ColorUtils, RGB} from "./ColorUtils";
// @ts-ignore
import ws281x from "rpi-ws281x";

export class SidePulse extends LedAnimation {

    color: RGB[];
    progress: number;
    length: number;

    private static TICK_INCREASE = 0.1;

    constructor(color: RGB[], length: number) {
        super();
        this.color = color;
        this.progress = 0;
        this.length = length;
    }

    public setColor() {

    }

    private fillLengthWithColor(start: number, length: number, colors: RGB[], pixels: Uint32Array) {
        for (let i = start; i < length; i++) {
            pixels[i] = ColorUtils.RGBtoColor(colors[i % colors.length]);
        }
    }

    private fillLengthWithColorInvers(start: number, length: number, colors: RGB[], pixels: Uint32Array) {
        for (let i = 0; i < length; i++) {
            pixels[start - i] = ColorUtils.RGBtoColor(colors[i % colors.length]);
        }
    }

    public play(): boolean {
        const sinProgress = Math.sin(this.progress % Math.PI);
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        const curLength = this.length * sinProgress;
        this.fillLengthWithColor(0, curLength, this.color, pixels);
        this.fillLengthWithColorInvers(LedAnimation.ledConfig.leds - 1, curLength, this.color, pixels);
        ws281x.render(pixels);
        this.progress += SidePulse.TICK_INCREASE;

        return this.progress > Math.PI;
    }

    public onClear() {
        this.progress = 0;
    }

    public getTicks(): number {
        return Math.PI / SidePulse.TICK_INCREASE;
    }

}
