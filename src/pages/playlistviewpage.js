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
  const { authtoken, userid } = useAuthcontext();
  const showbtntoggle = useparams.playlistid.includes(userid);
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
      console.log("Toast : video deleted");
    } else {
      console.log("Toast : something went wrong");
    }
  }
  return (
    <div
      className="display-flex
        flex-direction-column
        justify-content-center
        mt-5rem
        playlist-margin-horizontal
        "
    >
      {[...playlists.fetchedplaylist].map((item) => {
        return (
          <div key={item._id} className="video-playlist-item">
            <div className="video-playlist-item-image">
              <Link to={`/videopage/${item._id}`}>
                <img
                  className="video-playlist-item-thumbnail"
                  src={item.thumbnail}
                  alt="video"
                />
              </Link>
            </div>
            <div className="video-playlist-item-details">
              <Link
                className="video-playlist-item-name link-decoration text-black line-clamp-1 text-overflow-ellipsis"
                to={`/videopage/${item._id}`}
              >
                {item.name}
              </Link>
            </div>
            {showbtntoggle && (
              <button
                onClick={() => clickhandler({ itemid: item._id })}
                className="video-playlist-btn-delete"
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
// onClick={() => clickhandler({ itemid: item._id })}
