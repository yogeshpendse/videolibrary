export function primefilters(arr, primebool) {
  const newarr = [...arr];
  const retarr = newarr.filter((x) => (primebool ? x.prime : true));
  return retarr;
}

export function timefilters(arr, timebool) {
  if (timebool) {
    const newarr = [...arr];
    const retarr = newarr.filter((x) => x.time < 31);
    return retarr;
  }
  return arr;
}

export function sorter(arr, sortval) {
  const newarr = [...arr];
  if (sortval === "POPULAR") {
    const populararray = newarr.sort(
      (item1, item2) => item2.stars - item1.stars
    );
    return populararray;
  } else if (sortval === "NEWEST") {
    const newestarray = newarr.sort(
      (item1, item2) => item2.datenos - item1.datenos
    );
    return newestarray;
  } else {
    return [...arr];
  }
}
