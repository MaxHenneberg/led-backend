export class LedConfig {
    leds: number;
    brightness: number;
    gpio = 18;
    stripType = 'grb';

    constructor(leds: number, brightness: number) {
        this.leds = leds;
        this.brightness = brightness;
    }

}

export abstract class LedAnimation {
    protected static ledConfig: LedConfig;

    protected interval: number;

    constructor() {
        this.interval = 100;
    }


    static configure(ledConfig: LedConfig) {
        LedAnimation.ledConfig = ledConfig;
    }

    public abstract play(): boolean;

    public abstract onClear(): void;

}
