import React, { useContext, useState } from "react";
import { PixelId, TileModel } from "./tileModel";
import "./tile.css";
import { color2css } from "../Pallet/palletModel";
import { AppContext } from "../AppState/appStateContext";
import { debug } from "console";
import { SpriteEventHandler } from "../Sprite/spriteModel";

export interface TileProps {
  tile: TileModel;
  selectedPixels: [number, number][] | null;
  name: number;
  spriteEventHandler: SpriteEventHandler;
}

export const Tile = ({
  tile,
  selectedPixels,
  name,
  spriteEventHandler,
}: TileProps) => {
  const { dispatch, getColor } = useContext(AppContext);

  const getClassName = (rowIndex: number, colIndex: number) =>
    selectedPixels?.find(
      ([_rowIndex, _colIndex]) =>
        _rowIndex === rowIndex && _colIndex === colIndex
    )
      ? "selected-pixel"
      : "pixel";

  const updatePixel =
    (single: boolean) => (pixelId: PixelId) => (e: React.MouseEvent) =>
      single
        ? spriteEventHandler({
            type: "pixel-single",
            payload: pixelId,
          })
        : spriteEventHandler({
            type: "pixel",
            payload: pixelId,
          });

  return (
    <div grid-area={`tile${name}`}>
      <table className="tile" tabIndex={2}>
        <tbody>
          {tile.pixels.map((row, rowIndex) => (
            <tr key={rowIndex} className="tile-row">
              {row.map((pixel, columnIndex) => (
                <td
                  key={columnIndex}
                  className={getClassName(rowIndex, columnIndex)}
                  style={{
                    background: color2css(getColor(tile.palletIndex, pixel)),
                  }}
                  onMouseOver={updatePixel(false)({
                    name,
                    rowIndex,
                    columnIndex,
                  })}
                  onClick={updatePixel(true)({ name, rowIndex, columnIndex })}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
