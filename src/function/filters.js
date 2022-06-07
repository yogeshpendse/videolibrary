export function filteronlypro(videoarray, onlypro) {
  const data = [...videoarray].filter((item) => item.prime === true);
  if (onlypro) {
    return data;
  }
  return videoarray;
}
export function timefilters(arr, timebool) {
  if (timebool) {
    const newarr = [...arr];
    const retarr = newarr.filter((x) => x.time < 31);
    return retarr;
  }
  return arr;
}
export function sortfilter(array2, sortby) {
  const array = [...array2];
  if (sortby === "POPULAR") {
    const populararray = [...array].sort(
      (item1, item2) => item2.stars - item1.stars
    );
    return populararray;
  } else if (sortby === "NEWEST") {
    const newarray = [...array].sort(
      (item1, item2) => item2.datenos - item1.datenos
    );
    return newarray;
  } else {
    return array;
  }
}
export function searchfilter(array3, searchterm) {
  const term = searchterm.toUpperCase();
  const array = [...array3].filter((item) =>
    item.name.toUpperCase().includes(term)
  );
  return array;
}
