export class RGB {
    red: number;
    green: number;
    blue: number;

    constructor(red: number, green:number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

}

export class ColorUtils {
    public static toColor(red: number, green: number, blue: number): number {
        return (red << 16) | (green << 8) | blue;
    }


    public static fillArray(color: number, length: number, array: Uint32Array) {
        for (let i = 0; i < length; i++) {
            array[i] = color;
        }
    }
}
