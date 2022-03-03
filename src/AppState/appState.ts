import { off } from "process";
import { act } from "react-dom/test-utils";
import { Color, Pallet } from "../Pallet/palletModel";
import { SpriteSize } from "../Sprite/spriteModel";
import { cloneTile, PixelId, TileModel } from "../Tile/tileModel";
import { parseObjPallets } from "../VRam/Parsing/parsePallet";
import { parseState, Snes9xState } from "../VRam/snes9xStateParser";
import { Action } from "./actions";

export type SpriteSizes =
  | [8, 16]
  | [8, 32]
  | [8, 64]
  | [16, 32]
  | [16, 64]
  | [32, 64];

export type DrawingState = "none" | "drawing" | "erasing";

export interface AppState {
  drawingState: DrawingState;
  name: number;
  nameBase: number;
  pallets: Pallet[];
  ppuPalletParseOffset: number;
  // ppuBytes: Uint8Array;
  selectedColorIndex: number;
  selectedPalletIndex: number;
  selectedPixels: PixelId[];
  snes9xState: Snes9xState;
  spriteSize: SpriteSizes;
  spriteSizeSelect: 0 | 1;
  stateBytes: Uint8Array;
  tiles: TileModel[];
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

const getPixelsForCurrentPallet: (state: AppState) => PixelId[] = (state) => {
  const { selectedPalletIndex, selectedColorIndex, tiles } = state;
  const selectedPixels: PixelId[] = [];
  for (let name = 0; name < Object.keys(tiles).length; ++name) {
    if (tiles[name].palletIndex != selectedPalletIndex) continue;

    for (let rowIndex = 0; rowIndex < tiles[name].pixels.length; ++rowIndex) {
      for (
        let columnIndex = 0;
        columnIndex < tiles[name].pixels.length;
        ++columnIndex
      ) {
        if (tiles[name].pixels[rowIndex][columnIndex] == selectedColorIndex) {
          selectedPixels.push({ name, rowIndex, columnIndex });
        }
      }
    }
  }
  return selectedPixels;
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
  switch (action.type) {
    case "deselect-pixel":
      return {
        ...state,
        selectedPixels: [],
      };

    case "load-tiles":
      return {
        ...state,
        tiles: action.payload,
      };

    case "mouse-over-pixel": {
      const { name, rowIndex, columnIndex } = action.payload;
      switch (state.drawingState) {
        case "none":
          return state;
        case "drawing": {
          const newTile = cloneTile(state.tiles[name]);
          newTile.pixels[rowIndex][columnIndex] = state.selectedColorIndex;
          return {
            ...state,
            tiles: {
              ...state.tiles,
              [name]: newTile,
            },
          };
        }
        case "erasing": {
          const newTile = cloneTile(state.tiles[name]);
          newTile.pixels[rowIndex][columnIndex] = 0;
          return {
            ...state,
            tiles: {
              ...state.tiles,
              [name]: newTile,
            },
          };
        }
        default:
          return state;
      }
    }

    case "save-tiles": {
      const a = document.createElement("a");
      const url = URL.createObjectURL(new Blob([JSON.stringify(state.tiles)]));
      a.href = url;
      a.download = "tiles.json";
      a.click();
      URL.revokeObjectURL(url);
      return state;
    }

    /*case "select-another-pixel":
      return {
        ...state,
        selectedPixels: {
          ...state.selectedPixels,
          [action.payload.name]: [
            ...(state.selectedPixels[action.payload.name] ?? []),
            ...(action.payload.selectedPixels ?? []),
          ],
        },
      };*/
    case "select-name": {
      const newName = action.payload.absolute ?? (state.name + action.payload.offset!);
      return {
        ...state,
        name: Math.max(0, newName),
      };
    }

    case "select-name-base":{
      const newNameBase = action.payload.absolute ?? (state.name + action.payload.offset!);
      return {
        ...state,
        nameBase: Math.max(0, newNameBase),
      };
    }

    case "select-color": {
      const nextState = { ...state, selectedColorIndex: action.payload };
      if (action.payload == state.selectedColorIndex) {
        return appStateReducer(nextState, {
          type: "select-pixel",
          payload: getPixelsForCurrentPallet(state),
        });
      } else {
        return appStateReducer(nextState, {
          type: "select-pixel",
          payload: [],
        });
      }
    }

    case "select-pallet":
      return {
        ...state,
        selectedPalletIndex: Math.max(0, action.payload ?? 0),
      };

    case "select-pixel":
      return {
        ...state,
        selectedPixels: action.payload,
      };

    case "set-snes9xState":
      return {
        ...state,
        snes9xState: action.payload,
      };

    case "set-pallets":
      return {
        ...state,
        pallets: action.payload,
      };

    case "set-ppu-pallet-parse-offset": {
      const ppuPalletParseOffset = action.payload;
      const pallets = parseObjPallets(
        state.snes9xState.PPU,
        ppuPalletParseOffset
      );
      return {
        ...state,
        pallets: pallets.result,
        ppuPalletParseOffset,
      };
    }

    case "set-tiles":
      return {
        ...state,
        tiles: action.payload,
      };

    case "set-state-bytes":
      return {
        ...state,
        stateBytes: action.payload,
      };

    case "sprite-size-select":
      return {
        ...state,
        spriteSizeSelect: action.payload,
      };

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

    case "update-pixel": {
      const { pixelId, value } = action.payload;
      const { name, rowIndex, columnIndex } = pixelId;
      const newTile = cloneTile(state.tiles[name]);
      newTile.pixels[rowIndex][columnIndex] = value;
      return {
        ...state,
        tiles: {
          ...state.tiles,
          [name]: newTile,
        },
      };
    }
    case "update-sprite-size":
      return {
        ...state,
        spriteSize: action.payload,
      };

    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};
