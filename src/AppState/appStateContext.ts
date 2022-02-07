import { createContext, Dispatch } from "react"
import { Color } from "../Pallet/palletModel";
import { Action } from "./actions";

interface IAppContext {
    dispatch: Dispatch<Action>
    getColor: (palletIndex: number, colorIndex: number) => Color
    getSelectedPixels: (name: number) => [number, number][] | null
}

const notImplementedThrower = (name: string) => () => { throw new Error(`${name} not implemented`); }

export const AppContext = createContext<IAppContext>({
    dispatch: notImplementedThrower("dispatch"),
    getColor: notImplementedThrower("getColor"),
    getSelectedPixels: notImplementedThrower("getSelectedPixels")
});