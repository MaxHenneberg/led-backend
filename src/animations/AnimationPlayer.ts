import {LedAnimation} from "./LedAnimation";

export class AnimationPlayer {
    private currentTimer: NodeJS.Timer;
    private currentPlayingAnimation: LedAnimation;
    private interval: number;

    public play(animation: LedAnimation) {
        this.clearCurrentlyPlayingAnimation();
        this.currentPlayingAnimation = animation;
        this.currentPlayingAnimation.play();
    }

    public playInLoop(animation: LedAnimation, interval: number) {
        this.clearCurrentlyPlayingAnimation();
        this.currentPlayingAnimation = animation;
        this.currentTimer = setInterval(() => {
            if (this.currentPlayingAnimation.play()) {
                this.clearCurrentlyPlayingAnimation();
            }
        }, this.interval);
    }

    private clearCurrentlyPlayingAnimation() {
        if (this.currentTimer) {
            clearInterval(this.currentTimer);
        }
    }

}
