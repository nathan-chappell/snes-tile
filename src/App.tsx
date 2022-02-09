import React, { useReducer } from "react";
import "./App.css";
import { AppState, appStateReducer } from "./AppState/appState";
import { AppContext } from "./AppState/appStateContext";
import { makeDefaultPallet } from "./Pallet/palletModel";
import { Pallet } from "./Pallet/Pallet";
import { Tile } from "./Tile/Tile";
import { makeDefaultTile } from "./Tile/tileModel";
import { Sprite } from "./Sprite/Sprite";
import { SpriteModel } from "./Sprite/spriteModel";
import { Action } from "./AppState/actions";
import { ControlPanel } from "./Controls/ControlPanel";

const localStorageKey = "snes-tile-state";

const initialState: AppState = {
  drawingState: "none",
  name: 0,
  pallets: [...Array(8)].map(() => makeDefaultPallet()),
  selectedPalletIndex: 0,
  selectedColorIndex: 1,
  selectedPixels: {},
  spriteSize: [8, 16],
  spriteSizeSelect: 0,
  tiles: [...Array(64 * 64)].map(() => makeDefaultTile()),
};

const savedState: AppState = JSON.parse(
  localStorage.getItem(localStorageKey) ?? "{}"
);

export const defaultState = { ...initialState, ...savedState };

type ReducerT = (state: AppState, action: Action) => AppState;

type Middleware = (nextReducer: ReducerT) => ReducerT;

const logger: Middleware = (nextReducer) => (state, action) => {
  console.log("[LOGGER]", state, action);
  return nextReducer(state, action);
};

const saver: Middleware = (nextReducer) => (state, action) => {
  const newState = nextReducer(state, action);
  localStorage.setItem("snes-tile-state", JSON.stringify(newState));
  return newState;
};

const applyMiddleware: (
  middlewares: Middleware[],
  reducer: ReducerT
) => ReducerT = (middlewares, reducer) =>
  middlewares.reduce((r, m) => m(r), reducer);

const reducer = applyMiddleware([logger, saver], appStateReducer);

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const selectedTile = state.tiles[state.name];
  const selectedPallet = state.pallets[selectedTile.palletIndex];
  const getColor = (palletIndex: number, colorIndex: number) =>
    state.pallets[palletIndex][colorIndex];
  const getSelectedPixels = (name: number) => state.selectedPixels[name];

  const spriteModel: SpriteModel = {
    tiles: state.tiles,
    name: state.name,
    size: state.spriteSize[state.spriteSizeSelect],
  };

  console.log("selected pixels:", state.selectedPixels);

  return (
    <div className="App">
      <AppContext.Provider value={{ dispatch, getColor, getSelectedPixels }}>
        <Sprite sprite={spriteModel} />
        <Pallet
          pallet={selectedPallet}
          selectedColorIndex={state.selectedColorIndex}
        />
        <ControlPanel state={state} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
