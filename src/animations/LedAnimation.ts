export class LedConfig {
    leds: number;
    brightness: number;
    gpio = 18

    constructor(leds: number, brightness: number) {
        this.leds = leds;
        this.brightness = brightness;
    }

}

export abstract class LedAnimation {

    protected currentAnimation: NodeJS.Timer;
    protected static ledConfig: LedConfig;

    static configure(ledConfig: LedConfig) {
        LedAnimation.ledConfig = ledConfig;
    }

    protected abstract animation(): void;

    play(): void {
        if (this.currentAnimation) {
            clearInterval(this.currentAnimation);
        }
        this.currentAnimation = setInterval((() => this.animation()), 100);

    }

}
