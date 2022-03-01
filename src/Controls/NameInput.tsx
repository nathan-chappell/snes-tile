import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";

export interface NameInputProps {
  name: number;
  nameBase: number;
}

export const NameInput = ({ name, nameBase }: NameInputProps) => {
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
        max={0x800}
        step={1}
        onChange={(e) =>
          dispatch({
            type: "select-name",
            payload: e.target.valueAsNumber,
          })
        }
      />
      <label className="input-label" htmlFor="name">
        Name Base Select
      </label>
      <input
        type="number"
        value={nameBase}
        name="name-base"
        min={0}
        max={0x10000}
        step={0x800}
        onChange={(e) =>
          dispatch({
            type: "select-name-base",
            payload: e.target.valueAsNumber,
          })
        }
      />
    </div>
  );
};
