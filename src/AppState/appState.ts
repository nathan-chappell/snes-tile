import { Color, Pallet } from "../Pallet/pallet";
import { Tile } from "../Tile/tile";

export interface AppState {
    pallets: Pallet[]
    selectedPalletIndex: number
    selectedPixels?: [number, number][]
    selectedTileIndex: number
    tiles: Tile[]
}

// export interface Action {
//     type: 'select-pixel' | 'update-pallet',
//     payload: any
// }


export interface UpdatePalletPayload {
    colorIndex: number,
    rgbIndex: number,
    value: number
}

export interface UpdatePalletAction {
    type: 'update-pallet'
    payload: UpdatePalletPayload
}

export type SelectPixelPayload = [number, number];

export interface SelectPixelAction {
    type: 'select-pixel'
    payload: SelectPixelPayload
}

export type SelectColorPayload = number;

export interface SelectColorAction {
    type: 'select-color'
    payload: SelectColorPayload
}

export type Action = UpdatePalletAction | SelectPixelAction | SelectColorAction;

const updatePallet = (pallet: Pallet, colorIndex: number, color: Color) =>
    [...pallet.slice(0, colorIndex), color, ...pallet.slice(colorIndex+1)];

export const appStateReducer = (state: AppState, action: Action) => {
    console.log('[appStateReducer] state: ', state, 'action: ', action)
    switch (action.type) {
        case 'select-pixel':
            return { ...state, selectedPixels: [action.payload] };
        case 'update-pallet':
            const { colorIndex, rgbIndex, value } = action.payload;
            const selectedPalletIndex = state.tiles[state.selectedTileIndex].palletIndex;
            const selectedPallet = state.pallets[selectedPalletIndex];
            let newColor: Color = [...selectedPallet[colorIndex]];
            newColor[rgbIndex] = value;
            const newPallet = updatePallet(selectedPallet, colorIndex, newColor);
            return {
                ...state,
                pallets: [
                    ...state.pallets.slice(0, selectedPalletIndex),
                    newPallet,
                    ...state.pallets.slice(selectedPalletIndex + 1)
                ]
            };
        default:
            throw new Error(`Unknown action: ${JSON.stringify(action)}`);
    }
}