export interface VMA {
  High: number;
  Increment: number;
  Address: number;
  Mask1: number;
  FullGraphicCount: number;
  Shift: number;
}

export interface BG {
  SCBase: number;
  HOffset: number;
  VOffset: number;
  BGSize: number;
  NameBase: number;
  SCSize: number;
}

export interface SOBJ {
  HPos: number;
  VPos: number;
  HFlip: number;
  VFlip: number;
  Name: number;
  Priority: number;
  Palette: number;
  Size: number;
}

export interface PPU {
  VMA: VMA;
  WRAM: number;
  BG: BG[];
  BGMode: number;
  BG3Priority: number;
  CGFLIP: number;
  CGFLIPRead: number;
  CGADD: number;
  CGSavedByte: number;
  CGDATA: number[];
  SOBJ: SOBJ[];
  OBJThroughMain: number;
  OBJThroughSub: number;
  OBJAddition: number;
  OBJNameBase: number;
  OBJNameSelect: number;
  OBJSizeSelect: number;
  OAMAddr: number;
  SavedOAMAddr: number;
  OAMPriorityRotation: number;
  OAMFlip: number;
  OAMReadFlip: number;
  OAMTileAddress: number;
  OAMWriteRegister: number;
  OAMData: number[];
  FirstSprite: number;
  LastSprite: number;
  RangeTimeOver: number;
  HTimerEnabled: number;
  VTimerEnabled: number;
  HTimerPosition: number;
  VTimerPosition: number;
  IRQHBeamPos: number;
  IRQVBeamPos: number;
  HBeamFlip: number;
  VBeamFlip: number;
  HBeamPosLatched: number;
  VBeamPosLatched: number;
  GunHLatch: number;
  GunVLatch: number;
  HVBeamCounterLatched: number;
  Mode7HFlip: number;
  Mode7VFlip: number;
  Mode7Repeat: number;
  MatrixA: number;
  MatrixB: number;
  MatrixC: number;
  MatrixD: number;
  CentreX: number;
  CentreY: number;
  M7HOFS: number;
  M7VOFS: number;
  Mosaic: number;
  MosaicStart: number;
  BGMosaic: number[];
  Window1Left: number;
  Window1Right: number;
  Window2Left: number;
  Window2Right: number;
  RecomputeClipWindows: number;
  ClipCounts: number[];
  ClipWindowOverlapLogic: number[];
  ClipWindow1Enable: number[];
  ClipWindow2Enable: number[];
  ClipWindow1Inside: number[];
  ClipWindow2Inside: number[];
  ForcedBlanking: number;
  FixedColourRed: number;
  FixedColourGreen: number;
  FixedColourBlue: number;
  Brightness: number;
  ScreenHeight: number;
  Need16x8Mulitply: number;
  BGnxOFSbyte: number;
  M7byte: number;
  HDMA: number;
  HDMAEnded: number;
  OpenBus1: number;
  OpenBus2: number;
  VRAMReadBuffer: number;
}
