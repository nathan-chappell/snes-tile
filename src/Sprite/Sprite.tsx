import React, { useContext, useState } from "react";
import { AppContext } from "../AppState/appStateContext";
import { Tile } from "../Tile/Tile";
import { SpriteModel, SpriteEvent, SpriteEventHandler } from "./spriteModel";
import "./sprite.css";

export interface SpriteProps {
  sprite: SpriteModel;
  spriteEventHandler: SpriteEventHandler;
}

export const Sprite = ({
  sprite: { name, size, tiles },
  spriteEventHandler,
}: SpriteProps) => {
  const { getSelectedPixels } = useContext(AppContext);
  const [state, setState] = useState({ mouseOver: false });

  const onMouseOver = (e: React.MouseEvent) => {
    if (!state.mouseOver) {
      setState({ ...state, mouseOver: true });
    }
  };
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (state.mouseOver) {
      const newState = e.altKey ? "erasing" : "drawing";
      spriteEventHandler({type: newState});
    }
  };
  const onMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (state.mouseOver) {
      spriteEventHandler({type: "none"});
    }
  };
  const onMouseOut = (e: React.MouseEvent) => {
    e.preventDefault();
    if (state.mouseOver) {
      setState({ ...state, mouseOver: false });
    }
  };

  const renderedTiles: JSX.Element[] = [];

  for (let i = 0; i < size / 8; ++i) {
    for (let j = 0; j < size / 8; ++j) {
      const offset = name + i * 16 + j;
      renderedTiles.push(
        <Tile
          tile={tiles[offset]}
          selectedPixels={getSelectedPixels(offset)}
          name={offset}
          key={offset}
          spriteEventHandler={spriteEventHandler}
        />
      );
    }
  }

  return (
    <div className="container" {...{ onMouseOver, onMouseOut, onMouseDown, onMouseUp }}>
      <div className={`sprite sprite-${size}`}>{renderedTiles}</div>
    </div>
  );
};
