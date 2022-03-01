import { makeDefaultTile, TileModel } from "../../Tile/tileModel";
import { ParseResult } from "./parseTypes";

const parseBitPlane = (buffer: Uint8Array, offset: number) => {
    let bitPlane = [...Array(8)].map(() => Array(8));
    for (let x = 0; x < 8; ++x) {
        for (let y = 0; y < 8; ++y) {
            bitPlane[y][x] = (buffer[offset + 2 * y] >> (7 - x)) % 2;
        }
    }
    return bitPlane;
}

export const parseTile: (buffer: Uint8Array, offset: number) => ParseResult<TileModel>
    = (buffer, offset) => {
        const result = makeDefaultTile();
        const bp0 = parseBitPlane(buffer, offset);
        const bp1 = parseBitPlane(buffer, offset + 1);
        const bp2 = parseBitPlane(buffer, offset + 16);
        const bp3 = parseBitPlane(buffer, offset + 17);
        for (let x = 0; x < 8; ++x) {
            for (let y = 0; y < 8; ++y) {
                result.pixels[y][x] = (bp0[y][x] << 3) + (bp1[y][x] << 2) + (bp2[y][x] << 1) + (bp3[y][x] << 0)
            }
        }
        return { result, offset: offset + 32 };
    }

export const parseTiles: (buffer: Uint8Array, offset: number) => ParseResult<TileModel[]>
    = (buffer, offset) => {
        let result: TileModel[] = [];
        for (let i = 0; i < 0x1000; ++i) {
            const parseResult = parseTile(buffer, offset);
            offset = parseResult.offset;
            result.push(parseResult.result);
        }
        return { result, offset };
    }