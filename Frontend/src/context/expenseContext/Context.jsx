
import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
//initial state for user obj
const InitialState = {
    ui: JSON.parse(localStorage.getItem("ui")) || "Dashboard"
}
//declare createContext
export const Context = createContext(InitialState);
//declare createContext
/* eslint-disable react/prop-types */
export const UIContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, InitialState)
    useEffect(() => {
        localStorage.setItem("ui", JSON.stringify(state.ui))
    }, [state.ui])
    return <Context.Provider value={{ ui: state.ui, dispatch }}>
        {children}
    </Context.Provider>
}