import React, { useContext } from "react";
import { Tile } from "./tile";
import "./tile.css";
import { color2css } from "../Pallet/pallet";
import { AppContext } from "../AppState/appStateContext";
import { debug } from "console";

export interface TileProps {
  tile: Tile;
  selectedPixels?: [number, number][];
}

export const RenderTile = ({ tile, selectedPixels }: TileProps) => {
  console.log(tile);
  const { dispatch, getColor } = useContext(AppContext);
  // let [selectedRow, selectedCol] = selectedPixels ?? [-1, -1];

  const getClassName = (rowIndex: number, colIndex: number) =>
    selectedPixels?.find(([_rowIndex, _colIndex]) => _rowIndex === rowIndex && _colIndex === colIndex)
      ? "selected-pixel"
      : "pixel";
    
  return (
    <table className="tile">
      <tbody>
        {tile.pixels.map((row, rowIndex) => (
          <tr key={rowIndex} className="tile-row">
            {row.map((pixel, colIndex) => (
              <td
                key={colIndex}
                className={getClassName(rowIndex, colIndex)}
                style={{ background: color2css(getColor(tile.palletIndex, pixel)) }}
                onClick={() =>
                  dispatch!({
                    type: "select-pixel",
                    payload: [rowIndex, colIndex],
                  })
                }
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
