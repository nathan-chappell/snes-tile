import { off } from "process";
import { Color, Pallet } from "../Pallet/palletModel";
import { SpriteSize } from "../Sprite/spriteModel";
import { TileModel } from "../Tile/tileModel";
import { Action } from "./actions";

export type SpriteSizes =
  | [8, 16]
  | [8, 32]
  | [8, 64]
  | [16, 32]
  | [16, 64]
  | [32, 64];

export interface AppState {
  pallets: Pallet[];
  selectedPalletIndex: number;
  selectedPixels: { [name: number]: [number, number][] | null };
  name: number;
  tiles: TileModel[];
  spriteSize: SpriteSizes;
  spriteSizeSelect: 0 | 1;
}

const getCurrentTiles: (state: AppState) => [number, TileModel][] = ({
  spriteSize,
  spriteSizeSelect,
  tiles,
  name,
}) => {
  const dotsPerTile = spriteSize[spriteSizeSelect];
  let result: [number, TileModel][] = [];
  for (let i = 0; i < dotsPerTile / 8; ++i) {
    for (let j = 0; j < dotsPerTile / 8; ++j) {
      const offset = name + i * 16 + j;
      result.push([offset, tiles[offset]]);
    }
  }
  return result;
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
      return {
        ...state,
        tiles: newTiles.reduce(
          (tilesAcc, [_name, newTile]) => ({ ...tilesAcc, [_name]: newTile }),
          state.tiles
        ),
      };
    }

    case "select-pixel":
      return {
        ...state,
        selectedPixels: {
          ...state.selectedPixels,
          [action.payload.name]: action.payload.selectedPixels,
        },
      };

    case "sprite-size-select":
      return {
        ...state,
        spriteSizeSelect: action.payload
      }
      break;

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

    case "update-sprite-size":
      return {
        ...state,
        spriteSize: action.payload
      }

    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};
