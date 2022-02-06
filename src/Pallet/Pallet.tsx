import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";
import { color2css, Pallet } from "./pallet";
import "./pallet.css";

export interface PalletProps {
  pallet: Pallet;
}

export const RenderPallet = ({ pallet }: PalletProps) => {
  let { dispatch } = useContext(AppContext);

  const updatePallet = (i: number, value: number) =>
    dispatch!({ type: "update-pallet", payload: { i, value } });

  return (
    <div className="Pallet">
      {pallet.map((color, colorIndex) => (
        <div key={colorIndex} className="pallet-color">
          <div
            className="pallet-color-sample"
            style={{ background: color2css(color) }}
          />
          {[...Array(3)].map((_, i) => (
            <input
              key={i}
              type="number"
              min="0"
              max="32"
              step="1"
              value={color[i]}
              onChange={(e) => updatePallet(i, e.target.valueAsNumber)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
