import {LedAnimation} from "./LedAnimation";

export abstract class StatefulAnimation extends LedAnimation {
    protected animation(): void {
    }

    protected clearCurrentAnimation() {
        super.clearCurrentAnimation();
        this.resetState();
    };

    protected abstract resetState(): void;
}

