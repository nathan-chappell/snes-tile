import { createContext, Dispatch } from "react";
import { Color } from "../Pallet/palletModel";
import { PixelId } from "../Tile/tileModel";
import { Action } from "./actions";

interface IAppContext {
  dispatch: Dispatch<Action>;
  getColor: (palletIndex: number, colorIndex: number) => Color;
  getColorFromSelectedPallet: (colorIndex: number) => Color;
  getSelectedPixels: (name: number) => PixelId[];
}

const notImplementedThrower = (name: string) => () => {
  throw new Error(`${name} not implemented`);
};

export const AppContext = createContext<IAppContext>({
  dispatch: notImplementedThrower("dispatch"),
  getColor: notImplementedThrower("getColor"),
  getColorFromSelectedPallet: notImplementedThrower("getColorFromSelectedPallet"),
  getSelectedPixels: notImplementedThrower("getSelectedPixels"),
});
