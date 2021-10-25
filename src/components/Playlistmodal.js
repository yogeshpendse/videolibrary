import "../cssforcomponents/modalcss.css";
import axios from "axios";
import { useEffect } from "react";
import { useVidcontext } from "../contexts/Vidprovider";
import { useAuthcontext } from "../contexts/Loginprovider";
import { postaddtoplaylist } from "../api&url/postaddtoplaylist";
import { baseurl } from "../api&url/url";

export function Playlistmodal(params) {
  const { playlistdispatch, playlists } = useVidcontext();
  const { authtoken } = useAuthcontext();
  const url = baseurl + "/playlist/getallplaylist";
  const { setModaltoggle, modaltoggle, thisprod } = params;
  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const data = await axios.get(url, {
          headers: { authorization: authtoken },
          cancelToken: source.token,
        });
        playlistdispatch({
          type: "SET_PLAYLISTS",
          payload: { playlists: data.data.userplaylists },
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
  }, [authtoken, playlistdispatch, url]);
  async function clickhandler(item) {
    const response = await postaddtoplaylist({
      videouid: thisprod._id,
      playlistid: item.playlistcode,
      authtoken,
    });
    if (response.success) {
      console.log("Toast : video is added to playlist");
      setModaltoggle(false);
    } else if (
      response.errorresponse.message === "video is already present in playlist"
    ) {
      console.log("send package Toast : video is already present in playlist");
      setModaltoggle(false);
    } else {
      console.log("send package Toast : some error occured");
      setModaltoggle(false);
    }
  }
  return (
    <>
      {modaltoggle && (
        <div className="modal-overlay">
          <div className="modal-box text-align-center">
            <div className="modal">
              <div className="modal-content">
                {playlists.playlist.map((item) => {
                  return (
                    <div
                      key={item.playlistcode}
                      className="modal-control-items"
                    >
                      <label onClick={() => clickhandler(item)}>
                        {item.name}
                      </label>
                    </div>
                  );
                })}
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
