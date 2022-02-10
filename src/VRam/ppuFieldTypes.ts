import { BG, ppuFields, SOBJ, VMA } from "./ppuFields";

export type PrimitiveType =
  | "bool8"
  | "int16"
  | "short"
  | "uint16"
  | "uint32"
  | "uint8";

export type StructType = "VMA" | "BG" | "SOBJ";
export type FieldType = PrimitiveType | StructType;

export type FieldSizeMap = { [name in FieldType]: number };

export interface SimpleField {
  name: string;
  type: FieldType;
}

export type SimpleStruct = SimpleField[];

export interface ArrayField {
  name: string;
  arrayType: FieldType;
  length: number;
}

export type Field = SimpleField | ArrayField;