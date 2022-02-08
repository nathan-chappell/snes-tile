export type Color = [number, number, number];
export type Pallet = Color[];

export const number2rgb = (c: number) => {
    let _c = Math.min(c * 8, 255);
    let rgb = _c.toString(16);
    if (rgb.length < 2)
        rgb = '0' + rgb;
    return rgb;
}

export const rgb2color: (c: string) => Color =
    c => [[1,3],[3,5],[5,7]].map(([start,end]) => Math.floor(parseInt(c.substring(start,end), 16) / 8)) as Color

export const color2css = (color: Color) => '#' + color.reduce((acc: string, c: number) => acc + number2rgb(c), '');

export const makeDefaultPallet: () => Pallet = () => [
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