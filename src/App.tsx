import React, { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import { AppState, appStateReducer } from "./AppState/appState";
import { AppContext } from "./AppState/appStateContext";
import { makeDefaultPallet } from "./Pallet/palletModel";
import { Pallet } from "./Pallet/Pallet";
import { Tile } from "./Tile/Tile";
import { makeDefaultTile, PixelId } from "./Tile/tileModel";
import { Sprite } from "./Sprite/Sprite";
import {
  SpriteEvent,
  SpriteEventHandler,
  SpriteModel,
} from "./Sprite/spriteModel";
import { Action } from "./AppState/actions";
import { ControlPanel } from "./Controls/ControlPanel";

const localStorageKey = "snes-tile-state";

const initialState: AppState = {
  drawingState: "none",
  name: 0,
  pallets: [...Array(8)].map(() => makeDefaultPallet()),
  selectedPalletIndex: 0,
  selectedColorIndex: 1,
  selectedPixels: [],
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

const reducer = applyMiddleware([/*logger,*/ saver], appStateReducer);

type SpriteDrawingState = { state: "none" | "drawing" | "erasing" };

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const spriteDrawingStateRef = useRef<SpriteDrawingState>({ state: "none" });

  const selectedTile = state.tiles[state.name];
  const selectedPallet = state.pallets[selectedTile.palletIndex];
  const getColor = (palletIndex: number, colorIndex: number) =>
    state.pallets[palletIndex][colorIndex];
  
  const getSelectedPixels = (name: number) => state.selectedPixels.filter(pixelId => pixelId.name == name);

  const spriteModel: SpriteModel = {
    tiles: state.tiles,
    name: state.name,
    size: state.spriteSize[state.spriteSizeSelect],
  };

  let onKeyHandler = (e: KeyboardEvent) => {
    if ('0' <= e.key && e.key <= '9') {
      e.preventDefault();
      dispatch({type:'select-pallet', payload: parseInt(e.key)})
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', onKeyHandler);
    return () => document.removeEventListener('keydown', onKeyHandler);
  })


  const spriteEventHandler: SpriteEventHandler = (e) => {
    switch (e.type) {
      case "drawing":
        spriteDrawingStateRef.current.state = "drawing";
        break;
      case "erasing":
        spriteDrawingStateRef.current.state = "erasing";
        break;
      case "none":
        spriteDrawingStateRef.current.state = "none";
        break;
      case "pixel-single":
      case "pixel": {
        if (e.type !== 'pixel-single' && spriteDrawingStateRef.current.state == "none") break;
        const value =
          spriteDrawingStateRef.current.state == "drawing"
            ? state.selectedColorIndex
            : 0;
        dispatch({
          type: "update-pixel",
          payload: { pixelId: e.payload as PixelId, value },
        });
        break;
      }
    }
  };

  return (
    <div className="App">
      <AppContext.Provider value={{ dispatch, getColor, getSelectedPixels }}>
        <Sprite sprite={spriteModel} spriteEventHandler={spriteEventHandler} />
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
