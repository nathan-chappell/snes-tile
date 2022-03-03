import { Color, Pallet } from "../Pallet/palletModel";
import { PixelId, TileModel } from "../Tile/tileModel";
import { Snes9xState } from "../VRam/snes9xStateParser";
import { SpriteSizes } from "./appState";

export interface AbsoluteOrOffset {
  absolute?: number;
  offset?: number;
}

export interface DeselectPixelAction {
  type: "deselect-pixel";
  payload: null;
}

export interface LoadTilesAction {
  type: "load-tiles";
  payload: TileModel[];
}

export interface MouseOverPixelAction {
  type: "mouse-over-pixel";
  payload: PixelId;
}

export interface SaveTilesAction {
  type: "save-tiles";
}

export type SelectColorPayload = number;

export interface SelectColorAction {
  type: "select-color";
  payload: SelectColorPayload;
}

export interface SelectNameAction {
  type: "select-name";
  payload: AbsoluteOrOffset;
}

export interface SelectNameBaseAction {
  type: "select-name-base";
  payload: AbsoluteOrOffset;
}

export type SelectPalletPayload = number;

export interface SelectPalletAction {
  type: "select-pallet";
  payload: SelectPalletPayload;
}

export interface SetPalletsAction {
  type: "set-pallets";
  payload: Pallet[];
}

export interface SelectPixelAction {
  type: "select-pixel" | "select-another-pixel";
  payload: PixelId[];
}

export interface SetPPUPalletParseOffset {
  type: "set-ppu-pallet-parse-offset";
  payload: number;

}
export interface SetSnes9xStateAction {
  type: "set-snes9xState";
  payload: Snes9xState;
}

export interface SetTilesAction {
  type: "set-tiles";
  payload: TileModel[];
}

export interface SetStateBytesAction {
  type: "set-state-bytes";
  payload: Uint8Array;
}

export interface SpriteSizeSelectAction {
  type: "sprite-size-select";
  payload: 0 | 1;
}

export interface UpdatePalletPayload {
  colorIndex: number;
  rgbIndex: number;
  value: number;
}

export interface UpdatePalletAction {
  type: "update-pallet";
  payload: UpdatePalletPayload;
}

export interface UpdatePalletColorPayload {
  colorIndex: number;
  value: Color;
}

export interface UpdatePalletColorAction {
  type: "update-pallet-color";
  payload: UpdatePalletColorPayload;
}

export interface UpdatePixelPayload {
  pixelId: PixelId;
  value: number;
}

export interface UpdatePixelAction {
  type: "update-pixel";
  payload: UpdatePixelPayload;
}

export interface UpdateSpriteSizeAction {
  type: "update-sprite-size";
  payload: SpriteSizes;
}

export type Action =
  | DeselectPixelAction
  | LoadTilesAction
  | MouseOverPixelAction
  | SaveTilesAction
  | SelectColorAction
  | SelectNameAction
  | SelectNameBaseAction
  | SelectPalletAction
  | SelectPixelAction
  | SetPalletsAction
  | SetPPUPalletParseOffset
  | SetSnes9xStateAction
  | SetTilesAction
  | SetStateBytesAction
  | SpriteSizeSelectAction
  | UpdatePalletAction
  | UpdatePalletColorAction
  | UpdatePixelAction
  | UpdateSpriteSizeAction;
