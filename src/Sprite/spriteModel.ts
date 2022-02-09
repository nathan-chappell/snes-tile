import { PixelId, TileModel } from "../Tile/tileModel";

export type SpriteSize = 8 | 16 | 32 | 64

export interface SpriteDrawEvent {
    type: 'drawing' | 'erasing' | 'none';// | 'mouseOver' | 'mouseOut';
}

export interface SpritePixelEvent {
    type: 'pixel' | 'pixel-single'
    payload: PixelId
}

export type SpriteEvent = 
    SpriteDrawEvent |
    SpritePixelEvent
    ;

export type SpriteEventHandler = (e: SpriteEvent) => void;

export interface SpriteModel {
    tiles: TileModel[]
    name: number
    size: SpriteSize
}
