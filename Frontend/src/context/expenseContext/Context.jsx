import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
//initial state for user obj
const InitialState = {
  ui: JSON.parse(localStorage.getItem("ui")) || "Dashboard",
};
//declare createContext
export const Context = createContext(InitialState);
// export const useExpenseContext = () => useContext(Context);
//declare createContext
/* eslint-disable react/prop-types */
export const UIContextProvider = ({ children }) => {
    
  const [state, dispatch] = useReducer(Reducer, InitialState);
  


  return (
    <Context.Provider value={{ ui: state.ui, dispatch}}>
      {children}
    </Context.Provider>
  );
};
