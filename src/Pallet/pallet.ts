export type Color = [number, number, number];
export type Pallet = Color[];

export const number2rgb = (c: number) => {
    let _c = Math.min(c * 8, 255);
    let rgb = _c.toString(16);
    if (rgb.length < 2)
        rgb = '0' + rgb;
    return rgb;

}
export const color2css = (color: Color) => '#' + color.reduce((acc: string, c: number) => acc + number2rgb(c), '');

export const defaultPallet: Pallet = [
    [0, 0, 0],
    [32, 0, 0],
    [0, 32, 0],
    [0, 0, 32],

    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],

    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],

    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],

];