import { createContext, useContext, useReducer, useState } from "react";
import { vidreducer } from "../functions/reducerfn";
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
      }}
    >
      {children}
    </Vidcontext.Provider>
  );
}

export function useVidcontext() {
  return useContext(Vidcontext);
}
