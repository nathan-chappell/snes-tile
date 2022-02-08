import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";

export const DeselectPixel = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <button
      grid-area="buttons"
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
  );
};
