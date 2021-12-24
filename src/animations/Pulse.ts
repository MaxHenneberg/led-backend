import {LedAnimation, LedConfig} from "./LedAnimation";
import {ColorUtils} from "./ColorUtils";
// @ts-ignore
import ws281x from "rpi-ws281x";
import {StatefulAnimation} from "./StatefulAnimation";

export class Pulse extends StatefulAnimation {

    red: number;
    green: number;
    blue: number;
    progress: number;

    constructor(red: number, green: number, blue: number) {
        super();
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.progress = Math.PI / 4;
    }

    public setColor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    protected animation(): void {
        const sinProgress = Math.min(1, (0.1 + Math.sin(this.progress % Math.PI)));
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        const color = ColorUtils.toColor(
            Math.round(this.red * sinProgress),
            Math.round(this.green * sinProgress),
            Math.round(this.blue * sinProgress));

        ColorUtils.fillArray(color, LedAnimation.ledConfig.leds, pixels);
        ws281x.render(pixels);
        this.progress += 0.1;

        if (this.progress > (Math.PI * 3) / 4) {
            this.clearCurrentAnimation();
        }
    }

    protected resetState() {
        this.progress = Math.PI;
    }

}
