import { Color } from "../Pallet/palletModel";
import { PixelId } from "../Tile/tileModel";
import { SpriteSizes } from "./appState";



export interface DeselectPixelAction {
  type: "deselect-pixel";
  payload: null;
}

export interface MouseOverPixelAction {
  type: "mouse-over-pixel"
  payload: PixelId
}

export type SelectColorPayload = number;

export interface SelectColorAction {
  type: "select-color";
  payload: SelectColorPayload;
}

export type SelectPalletPayload = number;

export interface SelectPalletAction {
  type: "select-pallet";
  payload: SelectPalletPayload;
}

export interface SelectPixelAction {
  type: "select-pixel" | "select-another-pixel";
  payload: PixelId[];
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
  pixelId: PixelId
  value: number
}

export interface UpdatePixelAction {
  type: 'update-pixel'
  payload: UpdatePixelPayload
}

export interface UpdateSpriteSizeAction {
  type: "update-sprite-size"
  payload: SpriteSizes
}

export type Action =
  | DeselectPixelAction
  | SelectColorAction
  | SelectPalletAction
  | SelectPixelAction
  | SpriteSizeSelectAction
  | UpdatePalletAction
  | UpdatePalletColorAction
  | UpdatePixelAction
  | UpdateSpriteSizeAction
  | MouseOverPixelAction
  ;
