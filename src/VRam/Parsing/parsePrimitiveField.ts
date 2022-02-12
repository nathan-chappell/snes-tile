import { PrimitiveTypeName } from "../ppuFieldTypes";
import { ParseResult } from "./parseTypes";

export const parsePrimitiveField: (buffer: Uint8Array, offset: number, field: PrimitiveTypeName) => ParseResult<number> = (
    buffer,
    offset,
    type
  ) => {
    let result: number;
    switch (type) {
      case "bool8":
      case "uint8":
        result = buffer[offset];
        offset += 1;
        break;
      case "uint16":
        result = buffer[offset] + (buffer[offset + 1] << 8);
        offset += 2;
        break;
      case "uint32":
        result = buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16) + (buffer[offset + 3] << 24);
        offset += 4;
        break;
      case "int16": {
        const tmpbuf = new Int16Array(buffer, offset, 1);
        result = tmpbuf[0];
        offset += 2;
        break;
      }
      case "short": {
        const tmpbuf = new Float32Array(buffer, offset, 1);
        result = tmpbuf[0];
        offset += 2;
        break;
      }
    }
    return {result, offset};
  };