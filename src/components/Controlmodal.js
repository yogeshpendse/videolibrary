import { useVidcontext } from "../contexts/Vidprovider";

export function Controlmodal(params) {
  const { setModaltoggle, modaltoggle } = params;
  const { controls, controldispatch } = useVidcontext();
  return (
    <>
      {modaltoggle && (
        <div className="modal-overlay">
          <div className="modal-box text-align-center">
            <div className="modal">
              <div className="modal-content">
                <div className="modal-control-items">
                  <label>prime</label>
                  <input
                    onChange={() =>
                      controldispatch({
                        type: "TOGGLE_ONLYPRO",
                        payload: controls.onlypro,
                      })
                    }
                    type="checkbox"
                    checked={controls.onlypro}
                  />
                </div>
                <div className="modal-control-items">
                  <label>time</label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      controldispatch({
                        type: "TOGGLE_SHORTDOCS",
                        payload: controls.shortdocs,
                      })
                    }
                    checked={controls.shortdocs}
                  />
                </div>
                <div className="modal-control-items">
                  <label>sort</label>
                  <select
                    value={controls.sortby}
                    onChange={(event) =>
                      controldispatch({
                        type: "SORT_BY_VALUE",
                        payload: { sortby: event.target.value },
                      })
                    }
                  >
                    <option value="RANDOM">none</option>
                    <option value="POPULAR">star</option>
                    <option value="NEWEST">new</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              className="modal-close"
              onClick={() => setModaltoggle(false)}
            >
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
