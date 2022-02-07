import React, { useContext } from "react";
import { Tile as TileT } from "./tileModel";
import "./tile.css";
import { color2css } from "../Pallet/palletModel";
import { AppContext } from "../AppState/appStateContext";
import { debug } from "console";

export interface TileProps {
  tile: TileT;
  selectedPixels: [number, number][] | null;
}

export const Tile = ({ tile, selectedPixels }: TileProps) => {
  console.log(tile);
  const { dispatch, getColor } = useContext(AppContext);
  // let [selectedRow, selectedCol] = selectedPixels ?? [-1, -1];

  const getClassName = (rowIndex: number, colIndex: number) =>
    selectedPixels?.find(
      ([_rowIndex, _colIndex]) =>
        _rowIndex === rowIndex && _colIndex === colIndex
    )
      ? "selected-pixel"
      : "pixel";

  return (
    <>
      <table className="tile" tabIndex={2}>
        <tbody>
          {tile.pixels.map((row, rowIndex) => (
            <tr key={rowIndex} className="tile-row">
              {row.map((pixel, colIndex) => (
                <td
                  key={colIndex}
                  className={getClassName(rowIndex, colIndex)}
                  style={{
                    background: color2css(getColor(tile.palletIndex, pixel)),
                  }}
                  onClick={(e) =>
                    dispatch({
                      type: e.ctrlKey ? "select-another-pixel" : "select-pixel",
                      payload: [[rowIndex, colIndex]],
                    })
                  }
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => dispatch({ type: "select-pixel", payload: null })} className="clear-selection">
        Clear Selection
      </button>
    </>
  );
};
