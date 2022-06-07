import { useVidcontext } from "../contexts/Vidprovider";

export function Controlmodal(params) {
  const { setState } = params;
  const { controldispatch, controls } = useVidcontext();
  return (
    <div className="modal__overlay">
      <div className="modal">
        <div className="modal__header">Filter</div>
        <div className="modal__content">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p>prime :</p>
            <input
              type="checkbox"
              onChange={() => controldispatch({ type: "TOGGLE_ONLYPRO" })}
              checked={controls.onlypro}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p>time :</p>
            <input
              type="checkbox"
              onChange={() => controldispatch({ type: "TOGGLE_SHORTDOCS" })}
              checked={controls.shortdocs}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p> select:</p>
            <select
              onChange={(event) =>
                controldispatch({
                  type: "SORT_BY_VALUE",
                  payload: { sortby: event.target.value },
                })
              }
              value={controls.sortby}
            >
              <option value="">--Select--</option>
              <option value="POPULAR">stars</option>
              <option value="NEWEST">New</option>
            </select>
          </div>
        </div>
        <div className="modal__controls">
          <button className="btn btn--primary" onClick={() => setState(false)}>
            close
          </button>
        </div>
      </div>
    </div>
  );
}
