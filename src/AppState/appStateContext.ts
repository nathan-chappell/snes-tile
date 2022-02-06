import { createContext, Dispatch } from "react"
import { Action, AppState } from "./appState";

interface IAppContext {
    dispatch?: Dispatch<Action>
}

export const AppContext = createContext<IAppContext>({});