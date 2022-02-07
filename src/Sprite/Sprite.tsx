import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";
import { Tile } from "../Tile/Tile";
import { SpriteModel } from "./spriteModel";
import "./sprite.css";

export interface SpriteProps {
  sprite: SpriteModel;
}

export const Sprite = ({ sprite }: SpriteProps) => {
  const { getSelectedPixels } = useContext(AppContext);

  const [w, h] = sprite.size;
  if (w === 8 && h === 8) {
    return (
      <div className="sprite sprite-8-8">
        <Tile
          tile={sprite.tiles[sprite.name]}
          selectedPixels={getSelectedPixels(sprite.name)}
          name={sprite.name}
        />
      </div>
    );
  } else if (w === 16 && h === 16) {
    return (
      <div className="sprite sprite-16-16">
        {[0, 1, 16, 17].map((offset) => (
          <Tile
            key={offset}
            tile={sprite.tiles[sprite.name + offset]}
            selectedPixels={getSelectedPixels(sprite.name + offset)}
            name={sprite.name + offset}
          />
        ))}
      </div>
    );
  }
  return null;
};
