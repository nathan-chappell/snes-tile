import { Color, Pallet } from "../Pallet/palletModel";
import { Tile } from "../Tile/tileModel";

export interface AppState {
  pallets: Pallet[];
  selectedPalletIndex: number;
  selectedPixels: [number, number][] | null;
  selectedTileIndex: number;
  tiles: Tile[];
}

// export interface Action {
//     type: 'select-pixel' | 'update-pallet',
//     payload: any
// }

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

export type SelectPixelPayload = [number, number][] | null;

export interface SelectPixelAction {
  type: "select-pixel" | "select-another-pixel";
  payload: SelectPixelPayload;
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
  | SelectColorAction;

const updatePallet = (pallet: Pallet, colorIndex: number, color: Color) => [
  ...pallet.slice(0, colorIndex),
  color,
  ...pallet.slice(colorIndex + 1),
];

export const appStateReducer: (state: AppState, action: Action) => AppState = (
  state,
  action
) => {
  console.log("[appStateReducer] state: ", state, "action: ", action);
  switch (action.type) {
    case "select-pixel":
      return { ...state, selectedPixels: action.payload };
    case "select-another-pixel":
      return {
        ...state,
        selectedPixels: [
          ...(state.selectedPixels ?? []),
          ...(action.payload ?? []),
        ],
      };
    case "select-pallet": {
      const oldTile = state.tiles[state.selectedTileIndex];
      let newPixels = [...oldTile.pixels.map((a) => [...a])];
      state.selectedPixels?.forEach(([r, c]) => {
        newPixels[r][c] = action.payload;
      });
      return {
        ...state,
        tiles: [
          ...state.tiles.slice(0, state.selectedTileIndex),
          { ...oldTile, pixels: newPixels },
          ...state.tiles.slice(state.selectedTileIndex + 1),
        ],
      };
    }
    case "update-pallet": {
      const { colorIndex, rgbIndex, value } = action.payload;
      const selectedPalletIndex =
        state.tiles[state.selectedTileIndex].palletIndex;
      const selectedPallet = state.pallets[selectedPalletIndex];
      let newColor: Color = [...selectedPallet[colorIndex]];
      newColor[rgbIndex] = value;
      const newPallet = updatePallet(selectedPallet, colorIndex, newColor);
      return {
        ...state,
        pallets: [
          ...state.pallets.slice(0, selectedPalletIndex),
          newPallet,
          ...state.pallets.slice(selectedPalletIndex + 1),
        ],
      };
    }
    case "update-pallet-color":
      const { colorIndex, value } = action.payload;
      const selectedPalletIndex =
        state.tiles[state.selectedTileIndex].palletIndex;
      const selectedPallet = state.pallets[selectedPalletIndex];
      const newPallet = updatePallet(selectedPallet, colorIndex, value);
      return {
        ...state,
        pallets: [
          ...state.pallets.slice(0, selectedPalletIndex),
          newPallet,
          ...state.pallets.slice(selectedPalletIndex + 1),
        ],
      };
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};
