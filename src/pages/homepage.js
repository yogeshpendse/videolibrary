import { Datadisp } from "../components/Datadisp";
import { Inputfields } from "../components/Inputfields";
import { Navbar } from "../components/Navbar";
import { useVidcontext } from "../contexts/Vidprovider";

export function Hompeage() {
  const { loading } = useVidcontext();
  return (
    <div>
      <Navbar />

      <Inputfields />
      {loading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}

      <Datadisp />
    </div>
  );
}
