import { PPUField, PPUStructTypeName, PrimitiveField } from "./ppuFieldTypes";

export const VMAFields: PrimitiveField[] = [
  { name: "High", type: "bool8" },
  { name: "Increment", type: "uint8" },
  { name: "Address", type: "uint16" },
  { name: "Mask1", type: "uint16" },
  { name: "FullGraphicCount", type: "uint16" },
  { name: "Shift", type: "uint16" },
];

export const BGFields: PrimitiveField[] = [
  { name: "SCBase", type: "uint16" },
  { name: "HOffset", type: "uint16" },
  { name: "VOffset", type: "uint16" },
  { name: "BGSize", type: "uint8" },
  { name: "NameBase", type: "uint16" },
  { name: "SCSize", type: "uint16" },
];

export const SOBJFields: PrimitiveField[] = [
  { name: "HPos", type: "int16" },
  { name: "VPos", type: "uint16" },
  { name: "HFlip", type: "uint8" },
  { name: "VFlip", type: "uint8" },
  { name: "Name", type: "uint16" },
  { name: "Priority", type: "uint8" },
  { name: "Palette", type: "uint8" },
  { name: "Size", type: "uint8" },
];

export const PPUStructName2FieldsMap: {[name in PPUStructTypeName]: PrimitiveField[]} = {
  VMA: VMAFields,
  BG: BGFields,
  SOBJ: SOBJFields,
};

export const PPUFields: PPUField[] = [
  { name: "VMA", type: "VMA" },
  
  { name: "WRAM", type: "uint32" },
  
  { name: "BG", arrayType: "BG", length: 4 },
  
  { name: "BGMode", type: "uint8" },
  { name: "BG3Priority", type: "uint8" },
  
  { name: "CGFLIP", type: "bool8" },
  { name: "CGFLIPRead", type: "uint8" },
  { name: "CGADD", type: "uint8" },
  // { name: "CGSavedByte", type: "uint8" },
  { name: "CGDATA", arrayType: "uint8", length: 256 },

  { name: "SOBJ", arrayType: "SOBJ", length: 128 },
  { name: "OBJThroughMain", type: "bool8" },
  { name: "OBJThroughSub", type: "bool8" },
  { name: "OBJAddition", type: "bool8" },
  { name: "OBJNameBase", type: "uint16" },
  { name: "OBJNameSelect", type: "uint16" },
  { name: "OBJSizeSelect", type: "uint8" },
  
  { name: "OAMAddr", type: "uint16" },
  { name: "SavedOAMAddr", type: "uint16" },
  { name: "OAMPriorityRotation", type: "uint8" },
  { name: "OAMFlip", type: "uint8" },
  { name: "OAMReadFlip", type: "uint8" },
  { name: "OAMTileAddress", type: "uint16" },
  { name: "OAMWriteRegister", type: "uint16" },
  { name: "OAMData", arrayType: "uint8", length: 512 + 32 },

  { name: "FirstSprite", type: "uint8" },
  { name: "LastSprite", type: "uint8" },
  { name: "RangeTimeOver", type: "uint8" },

  { name: "HTimerEnabled", type: "bool8" },
  { name: "VTimerEnabled", type: "bool8" },
  { name: "HTimerPosition", type: "short" },
  { name: "VTimerPosition", type: "short" },
  { name: "IRQHBeamPos", type: "uint16" },
  { name: "IRQVBeamPos", type: "uint16" },

  { name: "HBeamFlip", type: "uint8" },
  { name: "VBeamFlip", type: "uint8" },
  { name: "HBeamPosLatched", type: "uint16" },
  { name: "VBeamPosLatched", type: "uint16" },
  { name: "GunHLatch", type: "uint16" },
  { name: "GunVLatch", type: "uint16" },
  { name: "HVBeamCounterLatched", type: "uint8" },

  { name: "Mode7HFlip", type: "bool8" },
  { name: "Mode7VFlip", type: "bool8" },
  { name: "Mode7Repeat", type: "uint8" },
  { name: "MatrixA", type: "short" },
  { name: "MatrixB", type: "short" },
  { name: "MatrixC", type: "short" },
  { name: "MatrixD", type: "short" },
  { name: "CentreX", type: "short" },
  { name: "CentreY", type: "short" },
  { name: "M7HOFS", type: "short" },
  { name: "M7VOFS", type: "short" },

  { name: "Mosaic", type: "uint8" },
  { name: "MosaicStart", type: "uint8" },
  { name: "BGMosaic", arrayType: "bool8", length: 4 },

  { name: "Window1Left", type: "uint8" },
  { name: "Window1Right", type: "uint8" },
  { name: "Window2Left", type: "uint8" },
  { name: "Window2Right", type: "uint8" },
  { name: "RecomputeClipWindows", type: "bool8" },
  { name: "ClipCounts", arrayType: "uint8", length: 6 },
  { name: "ClipWindowOverlapLogic", arrayType: "uint8", length: 6 },
  { name: "ClipWindow1Enable", arrayType: "uint8", length: 6 },
  { name: "ClipWindow2Enable", arrayType: "uint8", length: 6 },
  { name: "ClipWindow1Inside", arrayType: "bool8", length: 6 },
  { name: "ClipWindow2Inside", arrayType: "bool8", length: 6 },

  { name: "ForcedBlanking", type: "bool8" },

  { name: "FixedColourRed", type: "uint8" },
  { name: "FixedColourGreen", type: "uint8" },
  { name: "FixedColourBlue", type: "uint8" },
  { name: "Brightness", type: "uint8" },
  { name: "ScreenHeight", type: "uint16" },

  { name: "Need16x8Mulitply", type: "bool8" },
  { name: "BGnxOFSbyte", type: "uint8" },
  { name: "M7byte", type: "uint8" },

  { name: "HDMA", type: "uint8" },
  { name: "HDMAEnded", type: "uint8" },

  { name: "OpenBus1", type: "uint8" },
  { name: "OpenBus2", type: "uint8" },

  { name: "VRAMReadBuffer", type: "uint16" },
];
