import {LedAnimation, LedConfig} from "./LedAnimation";
import {ColorUtils, RGB} from "./ColorUtils";
// @ts-ignore
import ws281x from "rpi-ws281x";

export class Pulse extends LedAnimation {

    colors: RGB[];
    colorProgress: number;
    progress: number;

    constructor(colors: RGB[]) {
        super();
        this.colors = colors;
        this.colorProgress = 0;
        this.progress = Math.PI * 0.1;
        this.interval = 50;
    }

    public play(): boolean {
        const sinProgress = Math.sin(this.progress % Math.PI);
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        const currentColor = this.colors[this.colorProgress % this.colors.length];
        const color = ColorUtils.toColor(
            Math.round(currentColor.red * sinProgress),
            Math.round(currentColor.green * sinProgress),
            Math.round(currentColor.blue * sinProgress));

        ColorUtils.fillArray(color, LedAnimation.ledConfig.leds, pixels);
        ws281x.render(pixels);
        this.progress += 0.2;

        if (this.progress > (Math.PI * 0.8)) {
            this.colorProgress++;
            return true;
        } else {
            return false;
        }
    }

    public onClear() {
        this.progress = Math.PI * 0.1;
    }

}
