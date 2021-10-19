import { useState } from "react";
import { useParams } from "react-router-dom";
import { Playlistmodal } from "../components/Playlistmodal";
import { Videodisp } from "../components/Videodisp";
export function Vidpage() {
  const op = useParams();
  const [modaltoggle, setModaltoggle] = useState(false);
  const thisprod = { _id: op.id };
  console.log("op1", op);
  return (
    <div>
      <div style={{ marginTop: "5rem" }}>
        <h1 style={{ textAlign: "center" }}>this is Vidpage {op.id}</h1>
        <Videodisp videodocid={op.id} setModaltoggle={setModaltoggle} />
        {modaltoggle && (
          <Playlistmodal
            setModaltoggle={setModaltoggle}
            modaltoggle={modaltoggle}
            thisprod={thisprod}
          />
        )}
      </div>
    </div>
  );
}
