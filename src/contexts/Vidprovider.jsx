import { createContext, useContext, useReducer } from "react";
import { controlreducer } from "../reducers/controlreducer";
const Vidcontext = createContext();

export function Vidprovider({ children }) {
  const ko = "sdfsdf";
  const [controls, controldispatch] = useReducer(controlreducer, {
    searchterm: "",
    onlypro: false,
    shortdocs: false,
    sortby: "RANDOM",
  });
  return (
    <Vidcontext.Provider value={{ ko, controls, controldispatch }}>
      {children}
    </Vidcontext.Provider>
  );
}

export const useVidcontext = () => useContext(Vidcontext);
