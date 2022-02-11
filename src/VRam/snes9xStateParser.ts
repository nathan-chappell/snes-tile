import { off } from "process";
import { parsePPU } from "./Parsing/parsePPU";

let stateJson = require("./state1.json");

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

const parseFieldHeader: (a: Uint8Array, offset: number) => FieldHeader = (a, offset) => ({
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

export const parseState: (buffer: Uint8Array, offset?: number) => Snes9xState = (buffer, offset = 0) => {
  let result: any = {};
  const magic = uint8ArraySubstring(buffer, offset, MAGIC_NUMBER_LENGTH);
  console.log(magic);
  result = { ...result, magic };
  offset += FIELDS_OFFSET;
  while (offset < buffer.length) {
    const { name, length } = parseFieldHeader(buffer, offset);
    console.log(name, length);
    result = { ...result, [name]: new Uint8Array(buffer.buffer, offset + FIELD_HEADER_LENGTH, length) };
    offset += FIELD_HEADER_LENGTH + length;
  }
  console.log(result);
  const ppu = parsePPU(result.PPU as Uint8Array, 0);
  console.log(ppu);
  return result;
};

export const printState = () => {
  const array = btoUint8Array(stateJson.state1);
  console.log(array);
  const state = parseState(array);
  //   const ppu = parsePPU(state.PPU)
  //   const OAMAddrOffset = getFieldOffset('OAMAddr');
  //   const OAMDataOffset = getFieldOffset('OAMData');
  //   console.log(OAMAddrOffset, OAMDataOffset);
};
