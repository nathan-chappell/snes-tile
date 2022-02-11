import { BG, ppuFields, SOBJ, VMA } from "./ppuFields";

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

export type StructTypeName = "VMA" | "BG" | "SOBJ";

const StructTypeNames: StructTypeName[] = ["VMA", "BG", "SOBJ"];

export type FieldType = PrimitiveTypeName | StructTypeName;

export type FieldSizeMap = { [name in FieldType]: number };

export interface PrimitiveField {
  name: string;
  type: PrimitiveTypeName;
}

export interface StructField {
  name: string;
  type: StructTypeName;
}

export interface PrimitiveArrayField {
  name: string;
  arrayType: PrimitiveTypeName;
  length: number;
}

export interface StructArrayField {
  name: string;
  arrayType: StructTypeName;
  length: number;
}

export type Field = PrimitiveField | StructField | PrimitiveArrayField | StructArrayField;

export function isPrimitiveField(field: Field): field is PrimitiveField {
  return PrimitiveTypeNames.indexOf((field as PrimitiveField).type) !== -1;
}
export function isStructField(field: Field): field is StructField {
  return StructTypeNames.indexOf((field as StructField).type) !== -1;
}
export function isPrimitiveArrayField(field: Field): field is PrimitiveArrayField {
  return PrimitiveTypeNames.indexOf((field as PrimitiveArrayField).arrayType) !== -1;
}
export function isStructArrayField(field: Field): field is StructArrayField {
  return StructTypeNames.indexOf((field as StructArrayField).arrayType) !== -1;
}


// export type PrimitiveStruct = PrimitiveField[];