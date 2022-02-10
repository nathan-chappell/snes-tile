import { BG, ppuFields, SOBJ, VMA } from "./ppuFields";
import {
  ArrayField,
  FieldSizeMap,
  FieldType,
  SimpleField,
  SimpleStruct,
} from "./ppuFieldTypes";

export let fieldSizeMap: FieldSizeMap = {
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

const getStructSize = (simpleStruct: SimpleStruct) =>
  simpleStruct.reduce((acc, field) => {
    let size = fieldSizeMap[field.type];
    if (typeof size === "number") {
      return acc + size;
    } else {
      throw new Error("can't determine size");
    }
  }, 0);

fieldSizeMap = {
  ...fieldSizeMap,
  VMA: getStructSize(VMA),
  BG: getStructSize(BG),
  SOBJ: getStructSize(SOBJ),
};

export const getFieldOffset = (fieldName: string) => {
  let offset = 0;
  for (let i = 0; i < ppuFields.length; ++i) {
    if (ppuFields[i].name === fieldName) {
      return offset;
    } else if ("type" in ppuFields[i]) {
      let simpleField = ppuFields[i] as SimpleField;
      offset += fieldSizeMap[simpleField.type];
    } else if ("arrayType" in ppuFields[i]) {
      let arrayField = ppuFields[i] as ArrayField;
      offset += fieldSizeMap[arrayField.arrayType] * arrayField.length;
    }
  }
};
