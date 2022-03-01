import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";
import { DeselectPixel } from "./DeselectPixel";
import "./controls.css";
import { AppState, SpriteSizes } from "../AppState/appState";
import { SpriteSizeSelectCheckbox } from "./SpriteSizeSelectCheckbox";
import { SpriteSizeSelect } from "./SpriteSizeSelect";
import { NameInput } from "./NameInput";
import { SaveAndLoadTiles } from "./SaveAndLoadTiles";
import { LoadFromSaveState } from "./LoadFromSaveState";

export interface ControlPanelProps {
  state: AppState;
}

const spriteStringMap: { [spriteSizeString: string]: SpriteSizes } = {
  "8 - 16": [8, 16],
  "8 - 32": [8, 32],
  "8 - 64": [8, 64],
  "16 - 32": [16, 32],
  "16 - 64": [16, 64],
  "32 - 64": [32, 64],
};

export const ControlPanel = ({
  state: { name, nameBase, spriteSize, spriteSizeSelect },
}: ControlPanelProps) => {
  const spriteSizeString = `${spriteSize[0]} - ${spriteSize[1]}`;

  return (
    <div className="control-panel">
      <DeselectPixel />
      <SpriteSizeSelectCheckbox spriteSizeSelect={spriteSizeSelect} />
      <SpriteSizeSelect spriteSizeString={spriteSizeString} />
      <NameInput name={name} nameBase={nameBase} />
      <SaveAndLoadTiles />
      <LoadFromSaveState nameBase={nameBase} />
    </div>
  );
};
