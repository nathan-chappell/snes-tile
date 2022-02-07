import { createContext, Dispatch } from "react"
import { Color } from "../Pallet/pallet";
import { Action } from "./appState";

interface IAppContext {
    dispatch: Dispatch<Action>
    getColor: (palletIndex: number, colorIndex: number) => Color
}

const notImplementedThrower = (name: string) => () => { throw new Error(`${name} not implemented`); }

export const AppContext = createContext<IAppContext>({
    dispatch: notImplementedThrower("dispatch"),
    getColor: notImplementedThrower("getColor")
});