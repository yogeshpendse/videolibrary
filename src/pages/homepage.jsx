import { Videodisp } from "../components/Videodisp";
import { Controls } from "../components/Controls";
import { Playlistmodal } from "../components/Playlistmodal";
import { useState } from "react";
import { useAuth } from "../contexts/Authprovider";
import "../csslayouts/hompagelayout.css";
export function Homepage() {
  const [modaltoggle, setModaltoggle] = useState(false);
  const [currentvidid, setCurrentvidid] = useState({});
  const { authtoken } = useAuth();
  return (
    <div className="homepagelayout">
      <div className="homepagelayout__controls">
        <Controls />
      </div>
      <div className="homepagelayout__cards">
        <Videodisp
          setModaltoggle={setModaltoggle}
          setCurrentvidid={setCurrentvidid}
        />
      </div>
      {modaltoggle && authtoken && (
        <Playlistmodal
          currentvidid={currentvidid}
          setModaltoggle={setModaltoggle}
        />
      )}
    </div>
  );
}
