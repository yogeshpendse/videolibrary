export function vidreducer(prevstate, action) {
  switch (action.type) {
    case "HIGH_TO_LOW":
      return { ...prevstate, sorting: "HIGH_TO_LOW" };
    case "LOW_TO_HIGH":
      return { ...prevstate, sorting: "LOW_TO_HIGH" };
    case "TOGGLE_PRO_CONTENT":
      return {
        ...prevstate,
        onlypro: !prevstate.onlypro
      };
    case "TOGGLE_FIVE_MINUTES":
      return {
        ...prevstate,
        durationlimit5: !prevstate.durationlimit5
      };
    case "ADD_TO_WHISHLIST":
      console.log("prevstate.whishlist", prevstate.whishlist);
      const checkduplicate = prevstate.whishlist.some(
        (item) => item.id === action.payload.id
      );
      console.log("action.payload", action.payload);
      console.log("checkduplicate", checkduplicate);
      if (checkduplicate) {
        console.log("list me already hai");
        return { ...prevstate };
      }
      return {
        ...prevstate,
        whishlist: [...prevstate.whishlist, action.payload]
      };
    case "REMOVE_FROM_WHISHLIST":
      const itemtoberemoved = prevstate.whishlist.find(
        (item) => item.id === action.payload.id
      );
      console.log("itemtoberemoved", itemtoberemoved);
      const retarr = prevstate.whishlist.filter(
        (x) => x.id !== itemtoberemoved.id
      );
      return { ...prevstate, whishlist: [...retarr] };

    case "ADD_THIS_VIDEO_TO_PLAYLIST":
      const checkduplicate3 = prevstate.whishlist.some(
        (item) => item.id === action.payload.id
      );
      if (checkduplicate3 === false) {
        return {
          ...prevstate,
          whishlist: [...prevstate.whishlist, action.payload]
        };
      }
      return { ...prevstate };
    default:
      break;
  }
}
