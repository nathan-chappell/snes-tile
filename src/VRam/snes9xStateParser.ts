import { Pallet } from "../Pallet/palletModel";
import { TileModel } from "../Tile/tileModel";
import { parseObjPallets } from "./Parsing/parsePallet";
import { parsePPU } from "./Parsing/parsePPU";
import { parseTiles } from "./Parsing/parseTile";
import { PPU } from "./ppu";

// let stateJson = require("./smw.state3.json");
let stateJson = require("./super_metroid.state18.json");

const btoUint8Array = (b64: string) => {
  const s = atob(b64);
  const array = new Uint8Array(s.length);
  for (let i = 0; i < s.length; ++i) {
    array[i] = s.charCodeAt(i);
  }
  return array;
};

export interface Snes9xState {
  magic: string;
  version: number;
}

const uint8Array2string = (a: Uint8Array) => {
  let s = "";
  for (let i = 0; i < a.length; ++i) {
    s += String.fromCharCode(a[i]);
  }
  return s;
};

const uint8ArraySubstring = (a: Uint8Array, offset: number, count: number) =>
  uint8Array2string(new Uint8Array(a.buffer, offset, count));

export interface FieldHeader {
  name: string;
  length: number;
}

const parseFieldHeader: (a: Uint8Array, offset: number) => FieldHeader = (
  a,
  offset
) => ({
  name: uint8ArraySubstring(a, offset, 3),
  length: parseInt(uint8ArraySubstring(a, offset + 4, 6)),
});

const MAGIC_NUMBER_LENGTH = 13; // #!s9xsnp:\d{4}
const FIELDS_OFFSET = 14;
const FIELD_HEADER_LENGTH = 11; // \w{3}:\d{6}:0
const PPU_OAM_OFFST = 0;

export interface Snes9xState {
  magic: string;
  NAM: Uint8Array;
  CPU: Uint8Array;
  REG: Uint8Array;
  PPU: Uint8Array;
  DMA: Uint8Array;
  VRA: Uint8Array;
  RAM: Uint8Array;
  SRA: Uint8Array;
  FIL: Uint8Array;
  SND: Uint8Array;
  CTL: Uint8Array;
  TIM: Uint8Array;
}

interface ParseStateResult {
  snes9xState: Snes9xState;
  tiles: TileModel[];
  ppu: PPU;
  pallets: Pallet[];
}

const number16Array2Uint8Array: (a: number[]) => Uint8Array
  = (a) => {
    const result = new Uint8Array(a.length * 2);
    for (let i = 0; i < a.length; ++i) {
      result[2*i] = a[i] & 0xFF;
      result[2*i + 1] = a[i] >> 8;
    }
    return result;
  }

export const parseState: (
  buffer?: Uint8Array,
  offset?: number,
  nameBase?: number
) => ParseStateResult = (
  buffer = btoUint8Array(stateJson.state),
  offset = 0,
  nameBase = 0
) => {
  let snes9xStateGatherer: any = {};
  const magic = uint8ArraySubstring(buffer, offset, MAGIC_NUMBER_LENGTH);
  console.log(magic);
  snes9xStateGatherer = { ...snes9xStateGatherer, magic };
  offset += FIELDS_OFFSET;
  while (offset < buffer.length) {
    const { name, length } = parseFieldHeader(buffer, offset);
    console.log(name, length);
    snes9xStateGatherer = {
      ...snes9xStateGatherer,
      [name]: new Uint8Array(
        buffer.buffer,
        offset + FIELD_HEADER_LENGTH,
        length
      ),
    };
    offset += FIELD_HEADER_LENGTH + length;
  }
  const snes9xState = snes9xStateGatherer as Snes9xState;
  const ppu = parsePPU(snes9xState.PPU as Uint8Array, 0);
  const objVramOffset = (ppu.OBJNameBase << 13) + (ppu.OBJNameSelect << 12);
  const tilesParseResult = parseTiles(
    (snes9xState).VRA,
    nameBase
    // objVramOffset + 550 * 32//  + 890 * 32
  );
  const palletsParseResult = parseObjPallets(number16Array2Uint8Array(ppu.CGDATA), 256);
  console.log(snes9xState);
  console.log(ppu);
  console.log("objVramOffset: 0x" + objVramOffset.toString(16));
  console.log(tilesParseResult);
  return { snes9xState: snes9xState, tiles: tilesParseResult.result, ppu, pallets: palletsParseResult.result };
};

export const printState = () => {
  const array = btoUint8Array(stateJson.state);
  console.log(array);
  const state = parseState(array);
  //   const ppu = parsePPU(state.PPU)
  //   const OAMAddrOffset = getFieldOffset('OAMAddr');
  //   const OAMDataOffset = getFieldOffset('OAMData');
  //   console.log(OAMAddrOffset, OAMDataOffset);
};
