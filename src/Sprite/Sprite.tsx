import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";
import { Tile } from "../Tile/Tile";
import { SpriteModel } from "./spriteModel";
import "./sprite.css";

export interface SpriteProps {
  sprite: SpriteModel;
}

export const Sprite = ({ sprite: {name, size, tiles} }: SpriteProps) => {
  const { getSelectedPixels } = useContext(AppContext);

  const renderedTiles: JSX.Element[] = [];

  for (let i = 0; i < size / 8; ++i) {
    for (let j = 0; j < size / 8; ++j) {
      const offset = name + i*16 + j;
      renderedTiles.push(
        <Tile
          tile={tiles[offset]}
          selectedPixels={getSelectedPixels(offset)}
          name={offset}
          key={offset}
        />
      );
    }
  }

  return (
    <div className={`sprite sprite-${size}`}>
      {renderedTiles}
    </div>
  )
};
