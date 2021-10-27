import { useState } from "react";
import { useVidcontext } from "../contexts/Vidprovider";
import { Controlmodal } from "./Controlmodal";

export function Inputcontrols() {
  const { controls, controldispatch } = useVidcontext();
  const [modaltoggle, setModaltoggle] = useState(false);
  console.log(controls);
  return (
    <>
      <div className="display-flex justify-content-center">
        <input
          className="input-search text-align-center"
          value={controls.searchterm}
          onChange={(event) =>
            controldispatch({
              type: "SET_SEARCHTEXT",
              payload: { searchterm: event.target.value },
            })
          }
          type="search"
          placeholder="search videos"
        />
      </div>
      <button
        className="border-none font-size-larger ml-0_5rem filters"
        onClick={() => setModaltoggle(true)}
      >
        <i className="bi bi-filter"></i>&nbsp;
        <span>filters</span>
      </button>
      <hr />
      <Controlmodal setModaltoggle={setModaltoggle} modaltoggle={modaltoggle} />
    </>
  );
}
