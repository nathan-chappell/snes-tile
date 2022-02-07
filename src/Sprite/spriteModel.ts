import { TileModel } from "../Tile/tileModel";

export type SpriteSize = [8,8] | [16,16]

export interface SpriteModel {
    tiles: TileModel[]
    name: number
    size: SpriteSize
}
