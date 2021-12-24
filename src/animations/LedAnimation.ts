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

    protected static currentAnimation: NodeJS.Timer;
    protected static ledConfig: LedConfig;

    protected interval: number;

    constructor() {
        this.interval = 100;
    }


    static configure(ledConfig: LedConfig) {
        LedAnimation.ledConfig = ledConfig;
    }

    protected clearCurrentAnimation():void {
        if (LedAnimation.currentAnimation){
            clearInterval(LedAnimation.currentAnimation)
        }
    }

    protected abstract animation(): void;

    play(): void {
        if (LedAnimation.currentAnimation) {
            clearInterval(LedAnimation.currentAnimation);
        }
        LedAnimation.currentAnimation = setInterval((() => this.animation()), this.interval);

    }

}
