import React, { useContext } from "react";
import { Tile } from "./tile";
import "./tile.css";
import { color2css, Color, Pallet } from "../Pallet/pallet";
import { AppContext } from "../AppState/appStateContext";

export interface TileProps {
  tile: Tile;
  selectedPixel?: [number, number];
}

export const RenderTile = ({ tile, selectedPixel }: TileProps) => {
  console.log(tile);
  const { dispatch } = useContext(AppContext);
  let [selectedRow, selectedCol] = selectedPixel ?? [-1, -1];

  console.log("selected pixel", selectedRow, selectedCol);
  const getClassName = (rowIndex: number, colIndex: number) =>
    rowIndex === selectedRow && colIndex === selectedCol
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
                style={{ background: color2css(tile.pallet[pixel]) }}
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
