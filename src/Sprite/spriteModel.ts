import { TileModel } from "../Tile/tileModel";

export type SpriteSize = 8 | 16 | 32 | 64

export interface SpriteModel {
    tiles: TileModel[]
    name: number
    size: SpriteSize
}
