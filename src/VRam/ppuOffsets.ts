import { PPU, VMA } from "./ppu";
import { BGFields, PPUFields, SOBJFields, PPUStructName2FieldsMap, VMAFields } from "./ppuFields";
import {
  PPUField,
  PPUFieldSizeMap,
  isPrimitiveField,
  isPPUStructField,
  PrimitiveField,
  isPrimitiveArrayField,
  PrimitiveTypeName,
  isPPUStructArrayField,
} from "./ppuFieldTypes";

export let fieldSizeMap: PPUFieldSizeMap = {
  uint8: 1,
  bool8: 1,
  int16: 2,
  short: 2,
  uint16: 2,
  uint32: 2,
  VMA: 0,
  BG: 0,
  SOBJ: 0,
};

const getSimpleStructSize = (simpleStruct: PrimitiveField[]) =>
  simpleStruct.reduce((acc: number, field: PrimitiveField) => {
    let size = fieldSizeMap[field.type];
    if (typeof size === "number") {
      return acc + size;
    } else {
      throw new Error("can't determine size");
    }
  }, 0);

fieldSizeMap = {
  ...fieldSizeMap,
  VMA: getSimpleStructSize(VMAFields),
  BG: getSimpleStructSize(BGFields),
  SOBJ: getSimpleStructSize(SOBJFields),
};