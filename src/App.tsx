import React, { useReducer } from "react";
import "./App.css";
import { AppState, appStateReducer } from "./AppState/appState";
import { AppContext } from "./AppState/appStateContext";
import { makeDefaultPallet } from "./Pallet/palletModel";
import { Pallet } from "./Pallet/Pallet";
import { Tile } from "./Tile/Tile";
import { makeDefaultTile } from "./Tile/tileModel";

export const defaultState: AppState = {
  pallets: [...Array(8)].map(() => makeDefaultPallet()),
  selectedPalletIndex: 0,
  selectedPixels: null,
  selectedTileIndex: 0,
  tiles: [makeDefaultTile()], // add more tiles later
};

function App() {
  const [state, dispatch] = useReducer(appStateReducer, defaultState);
  const selectedTile = state.tiles[state.selectedTileIndex];
  const selectedPallet = state.pallets[selectedTile.palletIndex];
  const getColor = (palletIndex: number, colorIndex: number) => state.pallets[palletIndex][colorIndex];

  console.log('selected pixels:', state.selectedPixels);

  return (
    <div className="App">
      <AppContext.Provider value={{ dispatch, getColor }}>
        <Tile
          tile={selectedTile}
          selectedPixels={state.selectedPixels}
        />
        <Pallet pallet={selectedPallet} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
