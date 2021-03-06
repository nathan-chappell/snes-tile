export type Pixel = number;
export type TileSize = [8, 8];

export interface PixelId {
  name: number;
  rowIndex: number;
  columnIndex: number;
}

export interface TileModel {
  palletIndex: number;
  pixels: Pixel[][];
  size: TileSize;
}

export const cloneTile: (tileModel: TileModel) => TileModel = ({
  palletIndex,
  pixels,
  size,
}) => ({
  palletIndex,
  size: [...size],
  pixels: [...pixels.map((r) => [...r])],
});

export const makeDefaultTile: () => TileModel = () => ({
  pixels: [...Array(8)].map((_, i) => [...Array(8)].map((_, j) => 1 + i + j)),
  // pixels: [
  //     [1,1,1,1, 1,1,1,1],
  //     [2,2,2,2, 2,2,2,2],
  //     [1,1,1,1, 1,1,1,1],
  //     [2,2,2,2, 2,2,2,2],

  //     [1,1,1,1, 1,1,1,1],
  //     [3,1,3,1, 3,1,3,1],
  //     [1,1,1,1, 1,1,1,1],
  //     [3,1,3,1, 3,1,3,1],
  // ],
  size: [8, 8],
  palletIndex: 0,
});

export const createTile: (size: TileSize, palletIndex: number) => TileModel = (
  size = [8, 8],
  palletIndex = 0
) => {
  const [width, height] = size;
  const pixels = Array<Array<number>>(height);
  for (let i = 0; i < height; ++i) {
    pixels[i] = Array<number>(width);
  }
  return { pixels, size, palletIndex };
};
