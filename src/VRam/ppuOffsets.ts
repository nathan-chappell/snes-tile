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

const parsePrimitiveField: (buffer: Uint8Array, offset: number, field: PrimitiveTypeName) => [number, number] = (
  buffer,
  offset,
  type
) => {
  let value: number;
  switch (type) {
    case "bool8":
    case "uint8":
      value = buffer[offset];
      offset += 1;
      break;
    case "uint16":
      value = buffer[offset] + (buffer[offset + 1] << 8);
      offset += 2;
      break;
    case "uint32":
      value = buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16) + (buffer[offset + 3] << 24);
      offset += 4;
      break;
    case "int16": {
      const tmpbuf = new Int16Array(buffer, offset, 1);
      value = tmpbuf[0];
      offset += 2;
      break;
    }
    case "short": {
      const tmpbuf = new Float32Array(buffer, offset, 1);
      value = tmpbuf[0];
      offset += 2;
      break;
    }
  }
  return [value, offset];
};

const parseVMA: (buffer: Uint8Array, offset: number) => [VMA, number] = (buffer, offset = 0) => {
  let result: VMA = {
    High: 0,
    Increment: 0,
    Address: 0,
    Mask1: 0,
    FullGraphicCount: 0,
    Shift: 0,
  };
  for (let i = 0; i < VMAFields.length; ++i) {
    const field = VMAFields[i];
    let value: number;
    [value, offset] = parsePrimitiveField(buffer, offset, field.type);
    result[field.name as keyof VMA] = value;
  }
  return [result, offset];
};

type PrimitiveStruct = { [fieldName: string]: number };

export const parsePPU: (buffer: Uint8Array, offset: number) => PPU = (buffer, offset = 0) => {
  // parse VMA first to pass it in to initial PPU
  let vma: VMA;
  [vma, offset] = parseVMA(buffer, offset);

  let result: PPU = {
    VMA: vma,
    WRAM: 0,
    BG: [],
    BGMode: 0,
    BG3Priority: 0,
    CGFLIP: 0,
    CGFLIPRead: 0,
    CGADD: 0,
    CGSavedByte: 0,
    CGDATA: [],
    SOBJ: [],
    OBJThroughMain: 0,
    OBJThroughSub: 0,
    OBJAddition: 0,
    OBJNameBase: 0,
    OBJNameSelect: 0,
    OBJSizeSelect: 0,
    OAMAddr: 0,
    SavedOAMAddr: 0,
    OAMPriorityRotation: 0,
    OAMFlip: 0,
    OAMReadFlip: 0,
    OAMTileAddress: 0,
    OAMWriteRegister: 0,
    OAMData: [],
    FirstSprite: 0,
    LastSprite: 0,
    RangeTimeOver: 0,
    HTimerEnabled: 0,
    VTimerEnabled: 0,
    HTimerPosition: 0,
    VTimerPosition: 0,
    IRQHBeamPos: 0,
    IRQVBeamPos: 0,
    HBeamFlip: 0,
    VBeamFlip: 0,
    HBeamPosLatched: 0,
    VBeamPosLatched: 0,
    GunHLatch: 0,
    GunVLatch: 0,
    HVBeamCounterLatched: 0,
    Mode7HFlip: 0,
    Mode7VFlip: 0,
    Mode7Repeat: 0,
    MatrixA: 0,
    MatrixB: 0,
    MatrixC: 0,
    MatrixD: 0,
    CentreX: 0,
    CentreY: 0,
    M7HOFS: 0,
    M7VOFS: 0,
    Mosaic: 0,
    MosaicStart: 0,
    BGMosaic: [],
    Window1Left: 0,
    Window1Right: 0,
    Window2Left: 0,
    Window2Right: 0,
    RecomputeClipWindows: 0,
    ClipCounts: [],
    ClipWindowOverlapLogic: [],
    ClipWindow1Enable: [],
    ClipWindow2Enable: [],
    ClipWindow1Inside: [],
    ClipWindow2Inside: [],
    ForcedBlanking: 0,
    FixedColourRed: 0,
    FixedColourGreen: 0,
    FixedColourBlue: 0,
    Brightness: 0,
    ScreenHeight: 0,
    Need16x8Mulitply: 0,
    BGnxOFSbyte: 0,
    M7byte: 0,
    HDMA: 0,
    HDMAEnded: 0,
    OpenBus1: 0,
    OpenBus2: 0,
    VRAMReadBuffer: 0,
  };

  for (let i = 1; i < PPUFields.length; ++i) {
    const field = PPUFields[i];
    if (isPrimitiveField(field)) {
      let value: number;
      [value, offset] = parsePrimitiveField(buffer, offset, field.type);
      (result as any)[field.name] = value;
    } else if (isPrimitiveArrayField(field)) {
      let arrayValue: number[] = [];
      for (let i = 0; i < field.length; ++i) {
        let value: number;
        [value, offset] = parsePrimitiveField(buffer, offset, field.arrayType);
        arrayValue.push(value);
      }
      (result as any)[field.name] = arrayValue;
    } else if (isPPUStructField(field)) {
      throw new Error(`NotImplemented field: ${field.name}`);
    } else if (isPPUStructArrayField(field)) {
      let arrayValue: PrimitiveStruct[] = [];
      let structFields = PPUStructName2FieldsMap[field.arrayType];
      for (let i = 0; i < field.length; ++i) {
        let struct: PrimitiveStruct = {};
        for (let fieldIndex = 0; fieldIndex < structFields.length; ++fieldIndex) {
          let value: number;
          [value, offset] = parsePrimitiveField(buffer, offset, structFields[fieldIndex].type);
          struct[structFields[fieldIndex].name] = value;
        }
        arrayValue.push(struct);
      }
      (result as any)[field.name] = arrayValue;
    } else {
      throw new Error(`Unrecognized field: ${(field as any).name}`);
    }
  }

  return result;
};

// export const getFieldOffset = (fieldName: string) => {
//   let offset = 0;
//   for (let i = 0; i < PPUFields.length; ++i) {
//     if (PPUFields[i].name === fieldName) {
//       return offset;
//     } else if ("type" in PPUFields[i]) {
//       let simpleField = PPUFields[i] as PrimitiveField;
//       offset += fieldSizeMap[simpleField.type];
//     } else if ("arrayType" in PPUFields[i]) {
//       let arrayField = PPUFields[i] as ArrayField;
//       offset += fieldSizeMap[arrayField.arrayType] * arrayField.length;
//     }
//   }
// };

// export const getPPUFieldOffsets: (fields: PPUField[], startingOffset: number) => any
// = (fields, startingOffset = 0) =>
//   fields.reduce(
//     (offsets, field) => {
//       if (isPrimitiveField(field)) {
//         return {
//           ...offsets,
//           [field.name]: offsets.nextOffset,
//           nextOffset: offsets.nextOffset + fieldSizeMap[field.type],
//         };
//       } else if (isPPUStructField(field)) {
//         const structOffsets = getPPUFieldOffsets(
//           structNameMap[field.type],
//           (startingOffset = 0)
//         );
//         return {
//           ...offsets,
//           [field.name]: structOffsets,
//           nextOffset: offsets.nextOffset + fieldSizeMap[field.type],
//         };
//       }
//       return offsets;
//     },
//     { nextOffset: 0 }
//   );
