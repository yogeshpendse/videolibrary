import { useState } from "react";
import { Datadisp } from "../components/Datadisp";
import { Playlistmodal } from "../components/Playlistmodal";
import { useVidcontext } from "../contexts/Vidprovider";
// import { Inputfields } from "../components/Inputfields";

export function Hompeage() {
  const { loading } = useVidcontext();
  const [modaltoggle, setModaltoggle] = useState(false);
  const [thisprod, setThisprod] = useState({});
  return (
    <div style={{ marginTop: "5rem" }}>
      {/* <Inputfields /> */}
      {loading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
      <Datadisp setThisprod={setThisprod} setModaltoggle={setModaltoggle} />
      <Playlistmodal
        setModaltoggle={setModaltoggle}
        modaltoggle={modaltoggle}
        thisprod={thisprod}
      />
    </div>
  );
}
