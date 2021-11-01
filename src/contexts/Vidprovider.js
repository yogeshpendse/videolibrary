import { createContext, useContext, useReducer, useState } from "react";
import { vidreducer } from "../functions/reducerfn";
import { controlreducer } from "../reducers/controlreducer";
import { playlistreducer } from "../reducers/playlistreducer";
export const Vidcontext = createContext();

export function Vidprovider({ children }) {
  const [state, dispatch] = useReducer(vidreducer, {
    sortby: null,
    onlypro: false,
    durationlimit5: false,
    whishlist: [],
    playlist: [],
  });
  const [playlists, playlistdispatch] = useReducer(playlistreducer, {
    playlist: [],
    fetchedplaylist: [],
  });
  const [controls, controldispatch] = useReducer(controlreducer, {
    searchterm: "",
    onlypro: false,
    shortdocs: false,
    sortby: "RANDOM",
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
        setLoading,
        playlists,
        playlistdispatch,
        controls,
        controldispatch,
      }}
    >
      {children}
    </Vidcontext.Provider>
  );
}

export function useVidcontext() {
  return useContext(Vidcontext);
}
