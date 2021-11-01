export function searchitems(arr, searchterm) {
  const term = searchterm;
  const datatobesearched = [...arr];
  const arraytobereturned = datatobesearched.filter((x) =>
    x.name.toUpperCase().includes(term.toUpperCase())
  );
  return arraytobereturned;
}
