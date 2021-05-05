export function ascsortbydate(arr, sorttype) {
  if (sorttype !== null && sorttype === "LOW_TO_HIGH") {
    const newarr = [...arr];
    const ascsorted = newarr.sort((a, b) => {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return c - d;
    });
    return ascsorted;
  }
  if (sorttype !== null && sorttype === "LOW_TO_HIGH") {
    const newarr = [...arr];
    const dessorted = newarr.sort((a, b) => {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return d - c;
    });
    return dessorted;
  }
  return arr;
}

// export function dessortbydate(arr) {
//   const newarr = [...arr];
//   const dessorted = newarr.sort((a, b) => {
//     var c = new Date(a.date);
//     var d = new Date(b.date);
//     return d - c;
//   });
//   return dessorted;
// }
