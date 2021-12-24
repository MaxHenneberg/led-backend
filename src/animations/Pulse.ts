import {LedAnimation, LedConfig} from "./LedAnimation";
import {ColorUtils} from "./ColorUtils";
// @ts-ignore
import ws281x from "rpi-ws281x";

export class Pulse extends LedAnimation {

    red: number;
    green: number;
    blue: number;
    progress: number;

    constructor(red: number, green: number, blue: number) {
        super();
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.progress = Math.PI * 0.1;
        this.interval = 50;
    }

    public setColor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public play(): boolean {
        const sinProgress = Math.sin(this.progress % Math.PI);
        console.log(sinProgress);
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        const color = ColorUtils.toColor(
            Math.round(this.red * sinProgress),
            Math.round(this.green * sinProgress),
            Math.round(this.blue * sinProgress));

        ColorUtils.fillArray(color, LedAnimation.ledConfig.leds, pixels);
        ws281x.render(pixels);
        this.progress += 0.2;

        if (this.progress > (Math.PI * 0.9)) {
            console.log('finished');
            return true;
        }else{
            return false;
        }
    }

    public onClear() {
        this.progress = Math.PI * 0.1;
    }

}
