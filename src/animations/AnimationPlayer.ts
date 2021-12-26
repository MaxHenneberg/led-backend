import {LedAnimation} from "./LedAnimation";

export class AnimationPlayer {
    private currentRepeatTimer: NodeJS.Timer;
    private currentTimer: NodeJS.Timer;
    private currentPlayingAnimation: LedAnimation;

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
        }, interval);
    }

    public repeatAnimation(animation: LedAnimation, animationDuration: number, intervalRepeat: number) {
        this.clearRepeatTimer();
        console.log(animationDuration);
        console.log(animation.getTicks());
        const animationInterval = Math.round(animationDuration / animation.getTicks());
        console.log(animationInterval);
        this.currentRepeatTimer = setInterval(
            () => this.playInLoop(animation, animationInterval), intervalRepeat)
    }


    private clearCurrentlyPlayingAnimation() {
        if (this.currentTimer) {
            clearInterval(this.currentTimer);
            this.currentPlayingAnimation.onClear();
        }
    }

    private clearRepeatTimer() {
        if (this.currentRepeatTimer) {
            clearInterval(this.currentRepeatTimer);
        }
    }

}
