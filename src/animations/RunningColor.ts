import {LedAnimation} from "./LedAnimation";
// @ts-ignore
import ws281x from "rpi-ws281x";

export class RunningColor extends LedAnimation {
    private pixels: Uint32Array;
    private colors: number[];
    private offset: number;

    constructor(interval: number, colors: number[]) {
        super();
        this.pixels = new Uint32Array(LedAnimation.ledConfig.leds);
        this.interval = interval;
        this.colors = colors;
        this.offset = 0;
    }

    public setNewColors(colors: number[]): void {
        this.colors = colors;
    }

    public setInterval(interval: number): void {
        this.interval = interval;
    }

    protected animation(): void {
        for (let i = 0; i < LedAnimation.ledConfig.leds; i++) {
            this.pixels[i] = this.colors[(i + this.offset) % this.colors.length];
        }
        this.offset++;
        if (this.offset == this.colors.length) {
            this.offset = 0;
        }

        ws281x.render(this.pixels);
    }

}
