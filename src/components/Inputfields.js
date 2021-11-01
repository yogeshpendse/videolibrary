import { useVidcontext } from "../contexts/Vidprovider";

export function Inputfields() {
  const { dispatch, setsearchterm } = useVidcontext();
  return (
    <div className="inputs-alignment">
      <div className="basic-input">
        <input
          className="basic-input-box"
          type="text"
          placeholder="search videos"
          onChange={(event) => setsearchterm(event.target.value)}
        />
      </div>
      <div>
        <label>Sort by date : </label>
        <button onClick={() => dispatch({ type: "LOW_TO_HIGH" })}>
          Ascending
        </button>{" "}
        &nbsp;
        <button onClick={() => dispatch({ type: "HIGH_TO_LOW" })}>
          Decending
        </button>
      </div>
      <fieldset style={{ marginTop: "1rem" }}>
        <legend> Filters </legend>
        <label>
          <input
            type="checkbox"
            onChange={() => dispatch({ type: "TOGGLE_PRO_CONTENT" })}
            // onChange={() => console.log("clicked")}
          />
          only pro &nbsp;
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() => dispatch({ type: "TOGGLE_FIVE_MINUTES" })}
            // onChange={() => console.log("changed")}
          />
          &lt; five minutes
        </label>
      </fieldset>
    </div>
  );
}
