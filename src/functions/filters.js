export function filters(arr, open) {
  const newarr = [...arr];
  console.log("open", open);
  console.log("toggles.onlypro", open.protoggle);
  const retarr = newarr.filter((x) => (open.protoggle ? x.pro : true));
  const retarr2 = retarr.filter((x) =>
    open.durationtoggle ? x.duration < 5 : true
  );
  console.log("retarr", retarr);
  return retarr2;
}
