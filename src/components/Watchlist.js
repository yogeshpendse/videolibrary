import { useVidcontext } from "../contexts/Vidprovider";
import { Link } from "react-router-dom";
export function Watchlist() {
  // useVidcontext
  const { state, dispatch } = useVidcontext();
  const whishlist = state.whishlist;
  console.log("whishlist ope", whishlist);

  return (
    <div>
      {whishlist.length > 0 &&
        whishlist.map((item) => (
          <div key={item.id}>
            <div className="video-card">
              <div className="video-card-content">
                <div>
                  <img
                    className="video-card-image"
                    src={item.image}
                    alt="Scam 1992"
                  />
                </div>
                <div>
                  <span className="video-card-header">{item.name}</span>
                  <p className="video-card-description">{item.name}....</p>
                  <p>time: {item.duration}</p>
                  <p>date: {String(item.date).substring(0, 21)}</p>
                  <p>{item.pro && "pro content"}</p>
                </div>
                <div className="video-card-controls">
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_WHISHLIST", payload: item })
                    }
                  >
                    &#128465;
                  </button>
                  <Link to={`videopage/${item.id}`}>view</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
