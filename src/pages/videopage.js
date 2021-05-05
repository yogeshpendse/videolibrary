import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { data } from "../Data";
import { Videodisp } from "../components/Videodisp";
import { Videodispcontrols } from "../components/Videodispcontrols";
export function Vidpage() {
  const op = useParams();
  console.log("op1", op);
  const oped = data.find((item) => item.id === op.id);
  console.log("oped", oped);
  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>this is Vidpage</h1>
      <Videodisp viddata={oped} />
      <Videodispcontrols viddata={oped} />
      {/* <Controls /> */}
    </div>
  );
}
