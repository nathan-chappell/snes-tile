// import { Pallet, makeDefaultPallet } from "../Pallet/pallet"

export type Pixel = number
export type Size = [number, number]

export interface Tile {
    pixels: Pixel[][]
    size: [number, number]
    palletIndex: number
}

export const makeDefaultTile: () => Tile = () => ({
    pixels: [
        [1,1,1,1, 1,1,1,1],
        [2,2,2,2, 2,2,2,2],
        [1,1,1,1, 1,1,1,1],
        [2,2,2,2, 2,2,2,2],

        [1,1,1,1, 1,1,1,1],
        [3,1,3,1, 3,1,3,1],
        [1,1,1,1, 1,1,1,1],
        [3,1,3,1, 3,1,3,1],
    ],
    size: [8,8],
    palletIndex: 0,
});

export const createTile: (size: Size, palletIndex: number) => Tile =
    (size = [8, 8], palletIndex = 0) => {
        const [width, height] = size;
        const pixels = Array<Array<number>>(height);
        for (let i = 0; i < height; ++i) {
            pixels[i] = Array<number>(width);
        }
        return { pixels, size, palletIndex };
    }
