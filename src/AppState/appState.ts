import { Pallet } from "../Pallet/pallet";
import { Tile } from "../Tile/tile";

export interface AppState {
    selectedTile: Tile
    selectedPixel: [number, number] | null
    pallets: Pallet[]
}

export interface Action {
    type: 'select-pixel' | 'update-pallet',
    payload: any
}

export const appStateReducer = (state: AppState, action: Action) => {
    console.log('[appStateReducer] state: ', state, 'action: ', action)
    switch (action.type) {
        case 'select-pixel':
            return { ...state, selectedPixel: action.payload };
            case 'update-pallet':
            throw new Error(`Unknown action: ${action.type}`);
            return { ...state };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}