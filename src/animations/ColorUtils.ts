export class RGB {
    red: number;
    green: number;
    blue: number;

    constructor(red: number, green:number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public fade(opaque: number){
        return new RGB(this.red*opaque, this.green*opaque, this.blue*opaque);
    }

}

export class ColorUtils {
    public static toColor(red: number, green: number, blue: number): number {
        return (red << 16) | (green << 8) | blue;
    }

    public static RGBtoColor(rgb: RGB){
        return (rgb.red << 16) | (rgb.green << 8) | rgb.blue;
    }

    public static fillArray(color: number, length: number, array: Uint32Array) {
        for (let i = 0; i < length; i++) {
            array[i] = color;
        }
    }
}
