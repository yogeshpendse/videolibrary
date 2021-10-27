import { useState, useEffect } from "react";
import { useAuthcontext } from "../contexts/Loginprovider";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseurl } from "../api&url/url";
import { searchitems } from "../functions/searchitems";
import { useVidcontext } from "../contexts/Vidprovider";
import { primefilters, sorter, timefilters } from "../functions/filters";
export function Datadisp(params) {
  const { setThisprod, setModaltoggle, setLoading, loading } = params;
  const url = baseurl + "/video/getallvideos";
  const { authtoken } = useAuthcontext();
  const { controls } = useVidcontext();
  const [videoarray, setVideoarray] = useState([]);
  const newarr1 = searchitems(videoarray, controls.searchterm);
  const newarr2 = primefilters(newarr1, controls.onlypro);
  const newarr3 = timefilters(newarr2, controls.shortdocs);
  const newarr4 = sorter(newarr3, controls.sortby);
  useEffect(() => {
    let source = axios.CancelToken.source();
    setLoading(true);

    const loadData = async () => {
      try {
        const data = await axios.get(url, {
          cancelToken: source.token,
        });
        setVideoarray(data.data.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          setVideoarray([]);
        } else {
          setVideoarray([]);
          console.log("toast error");
          console.log(error);
        }
      }
    };
    loadData();
    setLoading(false);
    return () => {
      console.log("AxiosCancel: unmounting");
      source.cancel();
    };
  }, [authtoken, url, setLoading]);
  function handleclick(item) {
    setThisprod(item);
    setModaltoggle(true);
  }
  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <div className="video-container">
          {[...newarr4].map((x) => (
            <div className="video-card" key={x._id}>
              <div className="video-top">
                <img
                  src={x.thumbnail}
                  alt="video-thumbnail"
                  className="video-thumbnail"
                />
                <span className="video-time">{x.time} min</span>
                <div className="video-thumbnail-controls video-hover">
                  <button
                    className="video-thumbnail-button cursor-pointer"
                    onClick={() => handleclick(x)}
                  >
                    <i className="bi bi-list-ul"></i>
                  </button>
                </div>
              </div>
              <div className="video-details">
                <p className="video-title">
                  <Link
                    to={`/videopage/${x._id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {x.name}
                  </Link>
                </p>
                {/* <p class="video-creator">
                  {x.date}&nbsp;{x.stars}
                </p> */}
              </div>
              {/* <div class="view-button border-radius-top-0rem"> */}
              <Link
                to={`/videopage/${x._id}`}
                // style={{ color: "white", textDecoration: "none" }}
                className="view-button border-radius-top-0rem link-decoration"
              >
                view
              </Link>
              {/* </div> */}
              {/* <div style={{ display: "flex" }}>
                <div>
                  <Link to={`/videopage/${x._id}`}>
                    <h2>{x.name}</h2>
                  </Link>
                </div>
                <div className="video-card-controls">
                  <button onClick={() => handleclick(x)}>addtosomeplace</button>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
