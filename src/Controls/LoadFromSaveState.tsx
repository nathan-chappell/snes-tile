import React, { useContext } from "react";
import { AppContext } from "../AppState/appStateContext";
import { TileModel } from "../Tile/tileModel";
import { parseState } from "../VRam/snes9xStateParser";

const parseFile: (file?: File) => Promise<TileModel[]> | undefined = (file) =>
  file?.text().then((text) => JSON.parse(text) as TileModel[]);

export interface LoadFromSaveStateProps {
  nameBase: number;
}

export const LoadFromSaveState = ({ nameBase }: LoadFromSaveStateProps) => {
  const { dispatch } = useContext(AppContext);
  return (
    <div className="control-panel-item">
      <label className="input-label" htmlFor="load-tiles-from-state">
        Load Tiles From State
      </label>
      <input
        type="file"
        name="load-tiles-from-state"
        onChange={(e) =>
          (e.target.files ?? [])[0]?.arrayBuffer().then((buffer) =>
          {
            const vram = new Uint8Array(buffer);
            dispatch({
              type: "load-tiles",
              payload: parseState(vram, 0, nameBase).tiles,
            });
            dispatch({
              type: "set-vram",
              payload: vram,
            });
          }
          )
        }
      />
    </div>
  );
};
