import { useState } from "react";
import { useVidcontext } from "../contexts/Vidprovider";
import { Controlmodal } from "./Controlmodal";

export function Controls(params) {
  const { controldispatch, controls } = useVidcontext();
  const [state, setState] = useState(false);
  return (
    <div className="mt-2rem">
      <div>
        <center>
          <input
            type="text"
            className="input"
            value={controls.searchterm}
            onChange={(event) =>
              controldispatch({
                type: "SET_SEARCHTEXT",
                payload: { searchterm: event.target.value },
              })
            }
          />
        </center>
      </div>
      <button
        className="btn btn--olprimary mt-2rem"
        onClick={() => setState(true)}
      >
        filters
      </button>
      {state && <Controlmodal setState={setState} />}
    </div>
  );
}
