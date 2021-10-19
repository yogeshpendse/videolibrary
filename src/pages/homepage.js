import { useState } from "react";
import { Datadisp } from "../components/Datadisp";
import { Playlistmodal } from "../components/Playlistmodal";
// import { Inputfields } from "../components/Inputfields";

export function Hompeage() {
  const [loading, setLoading] = useState(true);
  const [modaltoggle, setModaltoggle] = useState(false);
  const [thisprod, setThisprod] = useState({});
  return (
    <div className="mt-5rem">
      <Datadisp
        setThisprod={setThisprod}
        setModaltoggle={setModaltoggle}
        setLoading={setLoading}
        loading={loading}
      />

      <Playlistmodal
        setModaltoggle={setModaltoggle}
        modaltoggle={modaltoggle}
        thisprod={thisprod}
      />
    </div>
  );
}
