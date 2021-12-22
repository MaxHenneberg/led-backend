import {LedAnimation} from "./LedAnimation";

export class RunningColor extends LedAnimation {

    private pixels = new Uint32Array(LedAnimation.ledConfig.leds);
    private colors: number[];
    private offset: number;

    constructor(interval: number, colors: number[]) {
        super();
        this.interval = interval;
        this.colors = colors;
        this.offset = 0;
    }

    public setNewColors(colors: number[]): void {
        this.colors = colors;
    }

    protected animation(): void {
        for (let i = 0; i < LedAnimation.ledConfig.leds; i++) {
            this.pixels[i] = this.colors[(i + this.offset) % this.colors.length];
        }
        this.offset++;
        if (this.offset == this.colors.length) {
            this.offset = 0;
        }
    }

}
