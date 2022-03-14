import { off } from "process";
import { Color, Pallet } from "../../Pallet/palletModel";
import { makeDefaultTile, TileModel } from "../../Tile/tileModel";
import { ParseResult } from "./parseTypes";

// fixed color add:
// red: 19 
// green: 28
// blue: 28
// value - 29587
// 
// pallet 4 at offset 70 ??

export const parseObjColor: (buffer: Uint8Array, offset: number) => ParseResult<Color> = (buffer, offset) => {
  const low = buffer[offset];
  const high = buffer[offset + 1];
  const val = (high << 8) + low;

  const r = val & 0x1f;
  const g = (val >> 5) & 0x1f;
  const b = (val >> 10) & 0x1f;
  // return { result: [b, g, r], offset: offset + 2 };
  return { result: [r, g, b], offset: offset + 2 };
  //   return { result: [32 - r, 32 - g, 32 - b], offset: offset + 2 };
};

export const parseObjPallet: (buffer: Uint8Array, offset: number) => ParseResult<Pallet> = (buffer, offset) => {
  let result: Pallet = [];
  for (let i = 0; i < 16; ++i) {
    const parseResult = parseObjColor(buffer, offset);
    offset = parseResult.offset;
    result.push(parseResult.result);
  }
  return { result, offset };
};

export const parseObjPallets: (buffer: Uint8Array, offset: number) => ParseResult<Pallet[]> = (buffer, offset) => {
  let result: Pallet[] = [];
  for (let i = 0; i < 8; ++i) {
    const parseResult = parseObjPallet(buffer, offset);
    offset = parseResult.offset;
    result.push(parseResult.result);
  }
  return { result, offset };
};
