import { Color, Pallet } from "../Pallet/palletModel";
import { SpriteSize } from "../Sprite/spriteModel";
import { TileModel } from "../Tile/tileModel";
import { Action } from "./actions";

export interface AppState {
  pallets: Pallet[];
  selectedPalletIndex: number;
  selectedPixels: { [name: number]: [number, number][] | null };
  name: number;
  tiles: TileModel[];
  spriteSize: SpriteSize;
}

const getCurrentTiles: (state: AppState) => [number, TileModel][] = (state) => {
  const [w, h] = state.spriteSize;
  if (w === 8 && h === 8) {
    return [[state.name, state.tiles[state.name]]];
  } else if (w === 16 && h === 16) {
    return [
      [state.name, state.tiles[state.name]],
      [state.name + 1, state.tiles[state.name + 1]],
      [state.name + 16, state.tiles[state.name + 16]],
      [state.name + 17, state.tiles[state.name + 17]],
    ];
  } else {
    throw new Error("NotImplemented");
  }
};

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
    case "deselect-pixel":
      return {
        ...state,
        selectedPixels: {},
      };

    case "select-pixel":
      return {
        ...state,
        selectedPixels: {
          ...state.selectedPixels,
          [action.payload.name]: action.payload.selectedPixels,
        },
      };

    case "select-another-pixel":
      return {
        ...state,
        selectedPixels: {
          ...state.selectedPixels,
          [action.payload.name]: [
            ...(state.selectedPixels[action.payload.name] ?? []),
            ...(action.payload.selectedPixels ?? []),
          ],
        },
      };

    case "select-pallet": {
      var newTiles: [number, TileModel][] = getCurrentTiles(state)?.map(
        ([oldName, oldTile]) => {
          let newPixels = [...oldTile.pixels.map((a) => [...a])];
          state.selectedPixels[oldName]?.forEach(([r, c]) => {
            newPixels[r][c] = action.payload;
          });
          return [oldName, { ...oldTile, pixels: newPixels }];
        }
      );
      debugger;
      return {
        ...state,
        tiles: newTiles.reduce(
          (tilesAcc, [_name, newTile]) => ({ ...tilesAcc, [_name]: newTile }),
          state.tiles
        ),
      };
    }

    case "update-pallet": {
      const { colorIndex, rgbIndex, value } = action.payload;
      const selectedPalletIndex = state.tiles[state.name].palletIndex;
      const selectedPallet = state.pallets[selectedPalletIndex];
      let newColor: Color = [...selectedPallet[colorIndex]];
      newColor[rgbIndex] = value;
      const newPallet = updatePallet(selectedPallet, colorIndex, newColor);
      return {
        ...state,
        pallets: {
          ...state.pallets,
          [selectedPalletIndex]: newPallet,
        },
      };
    }

    case "update-pallet-color":
      const { colorIndex, value } = action.payload;
      const selectedPalletIndex = state.tiles[state.name].palletIndex;
      const selectedPallet = state.pallets[selectedPalletIndex];
      const newPallet = updatePallet(selectedPallet, colorIndex, value);
      return {
        ...state,
        pallets: {
          ...state.pallets,
          [selectedPalletIndex]: newPallet,
        },
      };

    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};
