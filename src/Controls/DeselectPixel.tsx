import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";

export const DeselectPixel = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <div className="control-panel-item">
      <button
        onClick={() =>
          dispatch({
            type: "deselect-pixel",
            payload: null,
          })
        }
        className="clear-selection"
      >
        Clear Selection
      </button>
    </div>
  );
};
