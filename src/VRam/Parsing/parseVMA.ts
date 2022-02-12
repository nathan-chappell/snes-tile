import { VMA } from "../ppu";
import { VMAFields } from "../ppuFields";
import { parsePrimitiveField } from "./parsePrimitiveField";
import { ParseResult } from "./parseTypes";

export const parseVMA: (buffer: Uint8Array, offset: number) => ParseResult<VMA> = (buffer, offset = 0) => {
  let vma: VMA = {
    High: 0,
    Increment: 0,
    Address: 0,
    Mask1: 0,
    FullGraphicCount: 0,
    Shift: 0,
  };
  for (let i = 0; i < VMAFields.length; ++i) {
    const field = VMAFields[i];
    const parseResult = parsePrimitiveField(buffer, offset, field.type);
    vma[field.name as keyof VMA] = parseResult.result;
    offset = parseResult.offset;
  }
  return { result: vma, offset };
};