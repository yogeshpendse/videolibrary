import { useState } from "react";
import { useParams } from "react-router-dom";
import { Playlistmodal } from "../components/Playlistmodal";
import { Videodisp } from "../components/Videodisp";
export function Vidpage() {
  const op = useParams();
  const [modaltoggle, setModaltoggle] = useState(false);
  const thisprod = { _id: op.id };
  return (
    <div>
      <div className="mt-5rem">
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
