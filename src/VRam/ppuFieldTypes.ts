import { BGFields, PPUFields, SOBJFields, VMAFields } from "./ppuFields";

export type PrimitiveTypeName =
  | "bool8"
  | "int16"
  | "short"
  | "uint8"
  | "uint16"
  | "uint32"

const PrimitiveTypeNames: PrimitiveTypeName[] = [
  "bool8",
  "int16",
  "short",
  "uint8",
  "uint16",
  "uint32",
]

export type PPUStructTypeName = "VMA" | "BG" | "SOBJ";

const StructTypeNames: PPUStructTypeName[] = ["VMA", "BG", "SOBJ"];

export type PPUFieldType = PrimitiveTypeName | PPUStructTypeName;

export type PPUFieldSizeMap = { [name in PPUFieldType]: number };

export interface PrimitiveField {
  name: string;
  type: PrimitiveTypeName;
}

export interface PPUStructField {
  name: string;
  type: PPUStructTypeName;
}

export interface PrimitiveArrayField {
  name: string;
  arrayType: PrimitiveTypeName;
  length: number;
}

export interface PPUStructArrayField {
  name: string;
  arrayType: PPUStructTypeName;
  length: number;
}

export type PPUField = PrimitiveField | PPUStructField | PrimitiveArrayField | PPUStructArrayField;

export function isPrimitiveField(field: PPUField): field is PrimitiveField {
  return PrimitiveTypeNames.indexOf((field as PrimitiveField).type) !== -1;
}
export function isPPUStructField(field: PPUField): field is PPUStructField {
  return StructTypeNames.indexOf((field as PPUStructField).type) !== -1;
}
export function isPrimitiveArrayField(field: PPUField): field is PrimitiveArrayField {
  return PrimitiveTypeNames.indexOf((field as PrimitiveArrayField).arrayType) !== -1;
}
export function isPPUStructArrayField(field: PPUField): field is PPUStructArrayField {
  return StructTypeNames.indexOf((field as PPUStructArrayField).arrayType) !== -1;
}


// export type PrimitiveStruct = PrimitiveField[];