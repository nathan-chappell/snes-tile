import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";
import { DeselectPixel } from "./DeselectPixel";
import "./controls.css";
import { AppState, SpriteSizes } from "../AppState/appState";

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
  state: { spriteSize, spriteSizeSelect },
}: ControlPanelProps) => {
  const { dispatch } = useContext(AppContext);

  const spriteSizeString = `${spriteSize[0]} - ${spriteSize[1]}`;

  return (
    <div className="control-panel">
      <DeselectPixel />
      <label className="input-label" htmlFor="spriteSizeSelect">
        Sprite Size Select
      </label>
      <input
        type="checkbox"
        value={spriteSizeSelect}
        name="spriteSizeSelect"
        onChange={(e) =>
          dispatch({
            type: "sprite-size-select",
            payload: e.target.checked ? 1 : 0,
          })
        }
      />
      <label className="input-label" htmlFor="spriteSize">
        Sprite Size
      </label>
      <select
        value={spriteSizeString}
        name="spriteSize"
        onChange={(e) =>
          dispatch({
            type: "update-sprite-size",
            payload:
              spriteStringMap[e.target.options[e.target.selectedIndex].value],
          })
        }
      >
        {Object.keys(spriteStringMap).map((k) => (
          <option value={k}>{k}</option>
        ))}
      </select>
    </div>
  );
};
