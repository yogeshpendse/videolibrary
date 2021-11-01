export function controlreducer(prevstate, action) {
  switch (action.type) {
    case "SORT_BY_VALUE":
      return { ...prevstate, sortby: action.payload.sortby };
    case "TOGGLE_ONLYPRO":
      return { ...prevstate, onlypro: !prevstate.onlypro };
    case "TOGGLE_SHORTDOCS":
      return { ...prevstate, shortdocs: !prevstate.shortdocs };
    case "SET_SEARCHTEXT":
      return { ...prevstate, searchterm: action.payload.searchterm };
    default:
      break;
  }
}
