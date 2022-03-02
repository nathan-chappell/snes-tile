import { off } from "process";
import { Color, Pallet } from "../../Pallet/palletModel";
import { makeDefaultTile, TileModel } from "../../Tile/tileModel";
import { ParseResult } from "./parseTypes";

export const parseObjColor: (buffer: Uint8Array, offset: number) => ParseResult<Color>
    = (buffer, offset) => {
        let b1 = buffer[offset];
        let b2 = buffer[offset + 1];
        let r = b1 & 0x1F;
        let g = (b1 >> 5) + (3 << (b2 & 3));
        let b = (b2 >> 2) & 0x1F;
        return { result: [r,g,b], offset: offset + 2 };
    }

export const parseObjPallet: (buffer: Uint8Array, offset: number) => ParseResult<Pallet>
    = (buffer, offset) => {
        let result: Pallet = [];
        for (let i = 0; i < 16; ++i) {
            const parseResult = parseObjColor(buffer, offset);
            offset = parseResult.offset;
            result.push(parseResult.result);
        }
        return { result, offset };
    }

export const parseObjPallets: (buffer: Uint8Array, offset: number) => ParseResult<Pallet[]>
    = (buffer, offset) => {
        let result: Pallet[] = [];
        for (let i = 0; i < 8; ++i) {
            const parseResult = parseObjPallet(buffer, offset);
            offset = parseResult.offset;
            result.push(parseResult.result);
        }
        return { result, offset };
    }