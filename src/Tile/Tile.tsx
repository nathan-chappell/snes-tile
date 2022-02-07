import React, { useContext } from "react";
import { TileModel } from "./tileModel";
import "./tile.css";
import { color2css } from "../Pallet/palletModel";
import { AppContext } from "../AppState/appStateContext";
import { debug } from "console";

export interface TileProps {
  tile: TileModel;
  selectedPixels: [number, number][] | null;
  name: number;
}

export const Tile = ({ tile, selectedPixels, name }: TileProps) => {
  console.log(tile);
  const { dispatch, getColor } = useContext(AppContext);

  const getClassName = (rowIndex: number, colIndex: number) =>
    selectedPixels?.find(
      ([_rowIndex, _colIndex]) =>
        _rowIndex === rowIndex && _colIndex === colIndex
    )
      ? "selected-pixel"
      : "pixel";

  return (
    <div grid-area={`tile${name}`}>
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
                      payload: { selectedPixels: [[rowIndex, colIndex]], name },
                    })
                  }
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};