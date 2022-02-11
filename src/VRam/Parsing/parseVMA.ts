import { VMA } from "../ppu";
import { VMAFields } from "../ppuFields";
import { parsePrimitiveField } from "./parsePrimitiveField";

export const parseVMA: (buffer: Uint8Array, offset: number) => [VMA, number] = (buffer, offset = 0) => {
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