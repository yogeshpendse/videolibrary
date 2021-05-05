import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useVidcontext } from "../contexts/Vidprovider";
import { fakedatafetch } from "../fakedatafetch";
import { filters } from "../functions/filters";
import { ascsortbydate } from "../functions/functions";
import { searchitems } from "../functions/searchitems";

export function Datadisp() {
  const { state, dispatch, setLoading, searchterm } = useVidcontext();

  const [array, setArray] = useState([]);
  console.log(state);
  async function fetchingdata() {
    try {
      setLoading(true);
      const response = await fakedatafetch();
      setArray(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    fetchingdata();
  }, []);
  const sorttype = state.sorting;
  const protoggle = state.onlypro;
  const durationtoggle = state.durationlimit5;
  // const arr = [...array];
  const givenarr = [...array];
  const arr = searchitems(givenarr, searchterm);
  const finaldata = ascsortbydate(arr, sorttype);
  const curdata = filters(finaldata, { protoggle, durationtoggle });
  console.log("curdata", curdata);
  // console.log("data", data);
  // console.log("finaldata", finaldata);
  return (
    <div>
      <div className="video-card-container">
        {/* video card begins */}
        {curdata.map((x) => (
          <div key={x.id}>
            <div className="video-card">
              <div className="video-card-content">
                <div>
                  <img
                    className="video-card-image"
                    src={x.image}
                    alt="Scam 1992"
                  />
                </div>
                <div>
                  <span className="video-card-header">{x.name}</span>
                  <p className="video-card-description">{x.name}....</p>
                  <p>time: {x.duration}</p>
                  <p>date: {String(x.date).substring(0, 21)}</p>
                  <p>{x.pro && "pro content"}</p>
                </div>
                <div className="video-card-controls">
                  <button
                    onClick={() =>
                      dispatch({ type: "ADD_TO_WHISHLIST", payload: x })
                    }
                  >
                    +
                  </button>
                  <Link to={`videopage/${x.id}`}>view</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="video-card">
          <div class="video-card-content">
            <div>
              <img class="video-card-image" src="" alt="Scam 1992" />
            </div>
            <div>
              <span class="video-card-header">
                SCAM 1992 - The Harshad Mehta...
              </span>
              <p class="video-card-description">
                Set in 1980's it is a story of...
              </p>
            </div>
            <div class="video-card-controls">
              <button>+</button>
              <button>play</button>
            </div>
          </div>
        </div> */}
        {/* video card ends */}
      </div>
    </div>
  );
}
