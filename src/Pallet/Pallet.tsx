import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";
import { color2css, rgb2color, Pallet as PalletT } from "./palletModel";
import "./pallet.css";

export interface PalletProps {
  pallet: PalletT;
  selectedColorIndex: number;
}

export const Pallet = ({ pallet, selectedColorIndex }: PalletProps) => {
  let { dispatch } = useContext(AppContext);

  return (
    <div className="pallet">
      {pallet.map((color, colorIndex) => (
        <div
          key={colorIndex}
          className={
            "pallet-color " +
            (colorIndex === selectedColorIndex ? "selected-pallet-color" : "")
          }
          onClick={() =>
            dispatch({ type: "select-pallet", payload: colorIndex })
          }
        >
          <div className="container">
            <div
              className="pallet-color-sample"
              style={{ background: color2css(color) }}
            />
            {[...Array(3)].map((_, rgbIndex) => (
              <input
                key={rgbIndex}
                type="number"
                min="0"
                max="32"
                step="1"
                value={color[rgbIndex]}
                onChange={(e) =>
                  dispatch({
                    type: "update-pallet",
                    payload: {
                      colorIndex,
                      rgbIndex,
                      value: e.target.valueAsNumber,
                    },
                  })
                }
              />
            ))}
            <input
              type="color"
              value={color2css(color)}
              onChange={(e) =>
                dispatch({
                  type: "update-pallet-color",
                  payload: { colorIndex, value: rgb2color(e.target.value) },
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};
