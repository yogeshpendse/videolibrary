export function playlistreducer(prevstate, action) {
  switch (action.type) {
    case "SET_PLAYLISTS":
      return { ...prevstate, playlist: action.payload.playlists };
    case "CREATE_NEW_PLAYLIST":
      const playlistitem = action.payload.playlistitem;
      const playlistarray = prevstate.playlist;
      return { ...prevstate, playlist: [playlistitem, ...playlistarray] };
    case "DELETE_PLAYLIST":
      const playlistitemdelete = action.payload.playlistcode;
      const deletedplaylistarray = [...prevstate.playlist].filter(
        (item) => item.playlistcode !== playlistitemdelete
      );
      return { ...prevstate, playlist: deletedplaylistarray };
    case "ADD_TO_PLAYLIST":
      const playlistcode = action.payload.playlistcode;
      const newplaylistarray = action.payload.newplaylistarray;
      const playlistarray1 = prevstate.playlist;
      const newplaylistarray1 = playlistarray1.map((item) =>
        item.playlistcode === playlistcode
          ? { ...item, videos: newplaylistarray }
          : item
      );
      return { ...prevstate, playlist: newplaylistarray1 };
    case "DELETE_FROM_PLAYLIST":
      const deleteitemidcode = action.payload.itemid;
      const newplaylistarray2 = [...prevstate.fetchedplaylist].filter(
        (item) => item._id !== deleteitemidcode
      );
      return { ...prevstate, fetchedplaylist: newplaylistarray2 };
    case "SET_THIS_PLAYLIST":
      console.log({ fetchedvideos: action.payload.fetchedvideos });
      return { ...prevstate, fetchedplaylist: action.payload.fetchedvideos };
    default:
      break;
  }
}
