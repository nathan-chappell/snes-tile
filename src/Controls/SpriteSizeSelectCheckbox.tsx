import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";

export interface SpriteSizeSelectCheckboxProps {
    spriteSizeSelect: 0 | 1
}

export const SpriteSizeSelectCheckbox = ({spriteSizeSelect}: SpriteSizeSelectCheckboxProps) => {
  const { dispatch } = useContext(AppContext);
  return (
    <div className="control-panel-item">
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
    </div>
  );
};