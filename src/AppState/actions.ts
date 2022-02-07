import { Color } from "../Pallet/palletModel";

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

export type SelectPalletPayload = number;

export interface SelectPalletAction {
  type: "select-pallet";
  payload: SelectPalletPayload;
}

export interface SelectPixelPayload {
  selectedPixels: [number, number][] | null;
  name: number;
}

export interface SelectPixelAction {
  type: "select-pixel" | "select-another-pixel";
  payload: SelectPixelPayload;
}

export interface DeselectPixelAction {
  type: "deselect-pixel";
  payload: null;
}

export type SelectColorPayload = number;

export interface SelectColorAction {
  type: "select-color";
  payload: SelectColorPayload;
}

export type Action =
  | UpdatePalletAction
  | UpdatePalletColorAction
  | SelectPalletAction
  | SelectPixelAction
  | SelectColorAction
  | DeselectPixelAction;
