import { useVidcontext } from "../contexts/Vidprovider";
import { Link } from "react-router-dom";
// import { useAxios } from "../customhooks/useAxios";
import { useAuthcontext } from "../contexts/Loginprovider";
import { useEffect, useState } from "react";
import axios from "axios";
import { postplaylist } from "../api&url/postplaylist";
import { postdeleteplaylist } from "../api&url/postdeleteplaylist";
import { baseurl } from "../api&url/url";
export function Playlists() {
  const [text, setText] = useState("");
  const { authtoken, userid } = useAuthcontext();
  const { playlistdispatch, playlists } = useVidcontext();
  const url = baseurl + "/playlist/getallplaylist";

  async function clickhandler() {
    const plid = Date.now();
    const response = await postplaylist({ plid, authtoken, name: text });
    if (response.success) {
      const playlistitem = {
        _id: JSON.stringify(plid),
        name: text,
        playlistcode: response.response.playlistcode,
        userid,
        videos: [],
      };
      playlistdispatch({
        type: "CREATE_NEW_PLAYLIST",
        payload: { playlistitem },
      });
      setText("");
    } else {
      console.log("something went wrong");
    }
  }
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
  console.log("send package", {
    playlistarray: playlists.playlist,
    location: "watchlist.js",
  });
  async function deleteclickhandler(params) {
    const { playlistid } = params;
    const response = await postdeleteplaylist({ authtoken, playlistid });
    if (response.success) {
      playlistdispatch({
        type: "DELETE_PLAYLIST",
        payload: { playlistcode: playlistid },
      });
      console.log("toast");
    } else if (
      response.error.response.data.message === "Playlist doesn't exist" &&
      response.success === false
    ) {
      console.log("Toast : Playlist doesn't exist");
    } else {
      console.log("Toast : Some error happened");
    }
  }

  return (
    <div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button
          onClick={() => clickhandler()}
          disabled={text.length > 0 ? false : true}
        >
          check
        </button>
      </div>
      {playlists.playlist.map((item) => {
        return (
          <div key={item._id}>
            <h1>
              <Link to={`/playlist/${item.playlistcode}`}>{item.name}</Link>
              <button
                onClick={() =>
                  deleteclickhandler({ playlistid: item.playlistcode })
                }
              >
                delete
              </button>
            </h1>
          </div>
        );
      })}
    </div>
  );
}
