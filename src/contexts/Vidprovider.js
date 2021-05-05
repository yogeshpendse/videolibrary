import { createContext, useContext, useReducer, useState } from "react";
import { vidreducer } from "../functions/reducerfn";
export const Vidcontext = createContext();

export function Vidprovider({ children }) {
  const [state, dispatch] = useReducer(vidreducer, {
    sortby: null,
    onlypro: false,
    durationlimit5: false,
    whishlist: []
  });
  const [loading, setLoading] = useState(false);
  const [searchterm, setsearchterm] = useState("");
  return (
    <Vidcontext.Provider
      value={{
        searchterm,
        setsearchterm,
        state,
        dispatch,
        loading,
        setLoading
      }}
    >
      {children}
    </Vidcontext.Provider>
  );
}

export function useVidcontext() {
  return useContext(Vidcontext);
}
