import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";
import { TileModel } from "../Tile/tileModel";

const parseFile: (file?: File) => Promise<TileModel[]> | undefined = (file) =>
  file?.text().then((text) => JSON.parse(text) as TileModel[]);

export interface LoadTilesProps {}

export const SaveAndLoadTiles = ({}: LoadTilesProps) => {
  const { dispatch } = useContext(AppContext);
  return (
    <div className="control-panel-item">
      <label className="input-label" htmlFor="load-tiles">
        Load Tiles
      </label>
      <input
        type="file"
        accept=".json"
        name="load-tiles"
        onChange={(e) =>
          parseFile((e.target.files ?? [])[0])?.then((tiles) =>
            dispatch({
              type: "load-tiles",
              payload: tiles,
            })
          )
        }
      />
      <button
        className="input-button"
        onClick={() => dispatch({ type: "save-tiles" })}
      >
        Save Tiles
      </button>
    </div>
  );
};
