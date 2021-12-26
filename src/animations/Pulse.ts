import {LedAnimation, LedConfig} from "./LedAnimation";
import {ColorUtils, RGB} from "./ColorUtils";
// @ts-ignore
import ws281x from "rpi-ws281x";

export class Pulse extends LedAnimation {

    colors: RGB[];
    colorProgress: number;
    progress: number;

    private static PROGRESS_PER_TICK = 0.2;
    private static FINISHED_PERCENTAGE = 0.8;
    private static INITIAL_PERCENTAGE = 0.1;

    constructor(colors: RGB[]) {
        super();
        this.colors = colors;
        this.colorProgress = 0;
        this.progress = Math.PI * 0.1;
        this.interval = 50;
    }

    public play(): boolean {
        const sinProgress = Math.sin(this.progress % Math.PI);
        const prevSinProgress =
            Math.sin((Math.PI * Pulse.FINISHED_PERCENTAGE - this.progress) % Math.PI)
        const pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        const currentColor = this.colors[this.colorProgress % this.colors.length];
        let prevColor = this.colors[(this.colorProgress - 1) % this.colors.length];
        if(!prevColor) {
            prevColor = currentColor;
        }
        const color = ColorUtils.toColor(
            Math.min(255, Math.round((currentColor.red * sinProgress) + (prevColor.red * prevSinProgress))),
            Math.min(255, Math.round((currentColor.green * sinProgress) + (prevColor.green * prevSinProgress))),
            Math.min(255, Math.round((currentColor.blue * sinProgress) + (prevColor.blue * prevSinProgress))));

        ColorUtils.fillArray(color, LedAnimation.ledConfig.leds, pixels);
        ws281x.render(pixels);
        this.progress += Pulse.PROGRESS_PER_TICK;

        if (this.progress > (Math.PI * Pulse.FINISHED_PERCENTAGE)) {
            this.colorProgress++;
            return true;
        } else {
            return false;
        }
    }

    public onClear() {
        this.progress = Math.PI * Pulse.INITIAL_PERCENTAGE;
    }

    public getTicks(): number {
        return ((Math.PI * Pulse.FINISHED_PERCENTAGE) - (Math.PI * Pulse.INITIAL_PERCENTAGE)) / Pulse.PROGRESS_PER_TICK;
    }

}
