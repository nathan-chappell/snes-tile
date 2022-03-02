import { off } from "process";
import { Color, Pallet } from "../../Pallet/palletModel";
import { makeDefaultTile, TileModel } from "../../Tile/tileModel";
import { ParseResult } from "./parseTypes";

export const parseObjColor: (buffer: Uint8Array, offset: number) => ParseResult<Color> = (buffer, offset) => {
  let val = buffer[offset] + (buffer[offset + 1] << 8);

  let r = val & 0x1f;
  let g = (val >> 5) & 0x1f;
  let b = (val >> 10) & 0x1f;
  return { result: [r, g, b], offset: offset + 4 };
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
