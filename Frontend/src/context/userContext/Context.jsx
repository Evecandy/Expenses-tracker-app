import { createContext, useEffect, useReducer} from "react";
import Reducer from "./Reducer";

//initial state
const InitialState = {
    user: JSON.parse(localStorage.getItem("user")) || null

}

//create context
export const AuthContext = createContext (InitialState);

//provider component
/* eslint-disable react/prop-types */
export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, InitialState);
  
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
  
    return (
      <AuthContext.Provider value={{ user: state.user, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };
  