import { useVidcontext } from "../contexts/Vidprovider";

export function Videodispcontrols(params) {
  const { viddata } = params;
  const { dispatch } = useVidcontext();
  // const dispviddata = () => console.log("viddata", viddata);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() =>
            dispatch({ type: "ADD_THIS_VIDEO_TO_PLAYLIST", payload: viddata })
          }
        >
          +
        </button>
      </div>
    </div>
  );
}
// ADD_THIS_VIDEO_TO_PLAYLIST
