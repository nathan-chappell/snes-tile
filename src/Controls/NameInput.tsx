import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";

export interface NameInputProps {
    name: number
}

export const NameInput = ({name}: NameInputProps) => {
  const { dispatch } = useContext(AppContext);
  return (
    <div className="control-panel-item">
      <label className="input-label" htmlFor="name">
        Name Select
      </label>
      <input
        type="number"
        value={name}
        name="name"
        min={0}
        max={64}
        step={1}
        onChange={(e) =>
          dispatch({
            type: "select-name",
            payload: e.target.valueAsNumber,
          })
        }
      />
    </div>
  );
};