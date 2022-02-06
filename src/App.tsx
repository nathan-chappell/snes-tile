import React, { useReducer } from "react";
import "./App.css";
import { AppState, appStateReducer } from "./AppState/appState";
import { AppContext } from "./AppState/appStateContext";
import { RenderPallet } from "./Pallet/Pallet";
import { RenderTile } from "./Tile/Tile";
import { defaultTile } from "./Tile/tile";

export const defaultState: AppState = {
  selectedTile: defaultTile,
  selectedPixel: null,
};

function App() {
  const [state, dispatch] = useReducer(appStateReducer, defaultState);

  return (
    <div className="App">
      <AppContext.Provider value={{ dispatch }}>
        <RenderTile tile={state.selectedTile} selectedPixel={state.selectedPixel} />
        <RenderPallet pallet={state.selectedTile.pallet} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
