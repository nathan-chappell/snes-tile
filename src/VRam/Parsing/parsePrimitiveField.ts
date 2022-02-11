import { PrimitiveTypeName } from "../ppuFieldTypes";

export const parsePrimitiveField: (buffer: Uint8Array, offset: number, field: PrimitiveTypeName) => [number, number] = (
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