import { useState, useEffect } from "react";
import { useAuthcontext } from "../contexts/Loginprovider";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseurl } from "../api&url/url";
export function Datadisp(params) {
  const { setThisprod, setModaltoggle, setLoading, loading } = params;
  const url = baseurl + "/video/getallvideos";
  const { authtoken } = useAuthcontext();
  const [videoarray, setVideoarray] = useState([]);
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
          {videoarray.map((x) => (
            <div className="video-card" key={x._id}>
              <div class="video-top">
                <img
                  src={x.thumbnail}
                  alt="video-thumbnail"
                  class="video-thumbnail"
                />
                <span class="video-time">{x.time} min</span>
                <div class="video-thumbnail-controls video-hover">
                  <button
                    class="video-thumbnail-button cursor-pointer"
                    onClick={() => handleclick(x)}
                  >
                    <i class="bi bi-list-ul"></i>
                  </button>
                </div>
              </div>
              <div class="video-details">
                <p class="video-title">
                  <Link
                    to={`/videopage/${x._id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {x.name}
                  </Link>
                </p>
                {/* <p class="video-creator">Lorem, ipsum.</p> */}
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
