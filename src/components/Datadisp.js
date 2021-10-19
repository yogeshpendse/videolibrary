import { useState, useEffect } from "react";
import { useAuthcontext } from "../contexts/Loginprovider";
// import { Link } from "react-router-dom";
import axios from "axios";
// import { useVidcontext } from "../contexts/Vidprovider";
// import { useAxios } from "../customhooks/useAxios";
// import { fakedatafetch } from "../fakedatafetch";
// import { filters } from "../functions/filters";
// import { ascsortbydate } from "../functions/functions";
// import { searchitems } from "../functions/searchitems";
import { Link } from "react-router-dom";
import { baseurl } from "../api&url/url";
export function Datadisp(params) {
  const { setThisprod, setModaltoggle } = params;
  const url = baseurl + "/video/getallvideos";
  // const { state, dispatch, setLoading, searchterm, playlists } =
  // useVidcontext();
  const { authtoken } = useAuthcontext();
  const [videoarray, setVideoarray] = useState([]);
  // console.log(state);
  // useEffect(() => {
  //   async function fetchingdata() {
  //     try {
  //       setLoading(true);
  //       const response = await fakedatafetch();
  //       setArray(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  //   fetchingdata();
  // }, []);
  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const data = await axios.get(url, {
          cancelToken: source.token,
        });
        setVideoarray(data.data.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          setVideoarray([]);
          console.log("axiosCancel: caught cancel");
        } else {
          setVideoarray([]);
          console.log(error);
        }
      }
    };
    loadData();

    return () => {
      console.log("AxiosCancel: unmounting");
      source.cancel();
    };
  }, [authtoken, url]);
  // console.log("curvalarray", curvalarray, curdata);
  function handleclick(item) {
    setThisprod(item);
    setModaltoggle(true);
  }
  // console.log("send package", {
  //   playlists: playlists.playlist,
  //   location: "Datadisp.js",
  // });
  return (
    <div>
      <div className="video-card-container">
        {/* video card begins */}
        {videoarray.map((x) => (
          <div key={x._id}>
            <div style={{ display: "flex" }}>
              <div>
                <Link to={`/videopage/${x._id}`}>
                  <h2>{x.name}</h2>
                </Link>
              </div>
              <div className="video-card-controls">
                <button onClick={() => handleclick(x)}>addtosomeplace</button>
                {/* <Link to={`videopage/${x.id}`}>view</Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
