import { PPU, VMA } from "../ppu";
import { PPUFields, PPUStructName2FieldsMap } from "../ppuFields";
import { isPrimitiveField, isPrimitiveArrayField, isPPUStructField, isPPUStructArrayField } from "../ppuFieldTypes";
import { parsePrimitiveField } from "./parsePrimitiveField";
import { parseVMA } from "./parseVMA";

type PrimitiveStruct = { [fieldName: string]: number };

export const parsePPU: (buffer: Uint8Array, offset: number) => PPU = (buffer, offset = 0) => {
  // parse VMA first to pass it in to initial PPU
  const vmaParseResult = parseVMA(buffer, offset);
  offset = vmaParseResult.offset;

  let result: PPU = {
    VMA: vmaParseResult.result,
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
      const parseResult = parsePrimitiveField(buffer, offset, field.type);
      offset = parseResult.offset;
      (result as any)[field.name] = parseResult.result;
    } else if (isPrimitiveArrayField(field)) {
      let arrayValue: number[] = [];
      for (let i = 0; i < field.length; ++i) {
        const parseResult = parsePrimitiveField(buffer, offset, field.arrayType);
        offset = parseResult.offset;
        arrayValue.push(parseResult.result);
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
          const parseResult = parsePrimitiveField(buffer, offset, structFields[fieldIndex].type);
          offset = parseResult.offset;
          struct[structFields[fieldIndex].name] = parseResult.result;
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