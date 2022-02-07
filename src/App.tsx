import React, { useReducer } from "react";
import "./App.css";
import { AppState, appStateReducer } from "./AppState/appState";
import { AppContext } from "./AppState/appStateContext";
import { makeDefaultPallet } from "./Pallet/pallet";
import { RenderPallet } from "./Pallet/Pallet";
import { RenderTile } from "./Tile/Tile";
import { makeDefaultTile } from "./Tile/tile";

export const defaultState: AppState = {
  pallets: [...Array(8)].map(() => makeDefaultPallet()),
  selectedPalletIndex: 0,
  selectedPixels: undefined,
  selectedTileIndex: 0,
  tiles: [makeDefaultTile()], // add more tiles later
};

function App() {
  const [state, dispatch] = useReducer(appStateReducer, defaultState);
  const selectedTile = state.tiles[state.selectedTileIndex];
  const selectedPallet = state.pallets[selectedTile.palletIndex];
    // getColor: (palletIndex: number, colorIndex: number) => Color
  const getColor = (palletIndex: number, colorIndex: number) => state.pallets[palletIndex][colorIndex];

  return (
    <div className="App">
      <AppContext.Provider value={{ dispatch, getColor }}>
        <RenderTile
          tile={selectedTile}
          selectedPixels={state.selectedPixels}
        />
        <RenderPallet pallet={selectedPallet} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
