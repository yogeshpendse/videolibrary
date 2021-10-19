import { useParams } from "react-router";
import { useVidcontext } from "../contexts/Vidprovider";
import { useAuthcontext } from "../contexts/Loginprovider";
import axios from "axios";
import { useEffect } from "react";
import { postdeletefromplaylist } from "../api&url/postdeletefromplaylist";
import { Link } from "react-router-dom";
import { baseurl } from "../api&url/url";
export function Playlistviewpage() {
  const useparams = useParams();
  const { authtoken } = useAuthcontext();
  const { playlistdispatch, playlists } = useVidcontext();
  const url = baseurl + "/video/" + useparams.playlistid;
  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });

        playlistdispatch({
          type: "SET_THIS_PLAYLIST",
          payload: { fetchedvideos: response.data.videosdata },
        });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("axiosCancel: caught cancel");
        } else {
          console.log(error);
        }
      }
    };
    loadData();

    return () => {
      console.log("AxiosCancel: unmounting");
      source.cancel();
    };
  }, [url, playlistdispatch]);
  async function clickhandler(params) {
    const { itemid } = params;
    const response = await postdeletefromplaylist({
      playlistid: useparams.playlistid,
      videouid: itemid,
      authtoken,
    });
    if (response.success) {
      playlistdispatch({
        type: "DELETE_FROM_PLAYLIST",
        payload: { itemid },
      });
      console.log("deleted");
    }
  }
  return (
    <div className="video-container mt-5rem">
      {[...playlists.fetchedplaylist].map((item) => {
        return (
          <div key={item._id} className="video-card">
            <div className="video-top">
              <img
                src="https://i.ytimg.com/vi/uD0bR7JXI6k/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAhk-L_wECsqAxwendWgpXp_Yp01g"
                alt="video-thumbnail"
                className="video-thumbnail"
              />
              <span className="video-time">{item.time} min</span>
            </div>
            <div className="video-details">
              <Link
                className="video-title link-decoration"
                to={`/videopage/${item._id}`}
              >
                {item.name}
              </Link>
            </div>
            <Link
              className="view-button border-radius-bottom-0rem border-radius-top-0rem link-decoration"
              to={`/videopage/${item._id}`}
            >
              view
            </Link>
            <button
              onClick={() => clickhandler({ itemid: item._id })}
              className="view-button-delete border-radius-top-0rem"
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
