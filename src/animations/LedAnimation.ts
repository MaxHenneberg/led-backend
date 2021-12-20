class LedConfig {
    leds: number;
    brightness: number;
    gpio = 18

    constructor(leds: number, brightness: number) {
        this.leds = leds;
        this.brightness = brightness;
    }

}

abstract class LedAnimation {

    protected currentAnimation: NodeJS.Timer;
    protected static ledConfig: LedConfig;

    static configure(ledConfig: LedConfig) {
        LedAnimation.ledConfig = ledConfig;
    }

    abstract animation():void;

    play(): void {
        if (this.currentAnimation) {
            clearInterval(this.currentAnimation);
        }
        this.animation();
    }

}
