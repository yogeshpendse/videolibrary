export function Videodispcontrols(params) {
  const { setModaltoggle } = params;
  // const dispviddata = () => console.log("viddata", viddata);
  return (
    <>
      <button onClick={() => setModaltoggle(true)}>add to playlist</button>
    </>
  );
}
// ADD_THIS_VIDEO_TO_PLAYLIST
