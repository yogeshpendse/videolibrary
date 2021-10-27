import { useVidcontext } from "../contexts/Vidprovider";
import { Link } from "react-router-dom";
// import { useAxios } from "../customhooks/useAxios";
import { useAuthcontext } from "../contexts/Loginprovider";
import { useEffect, useState } from "react";
import axios from "axios";
import { postplaylist } from "../api&url/postplaylist";
import { postdeleteplaylist } from "../api&url/postdeleteplaylist";
import { baseurl } from "../api&url/url";
import { toast } from "react-toastify";
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
      // console.log("Toast : playlist created");
      toast.success("playlist created", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // console.log("Toast : something went wrong");
      toast.error("something went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      // console.log("Toast : Playlist deleted");
      toast.success("Playlist deleted", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      response.error.response.data.message === "Playlist doesn't exist" &&
      response.success === false
    ) {
      // console.log("Toast : Playlist doesn't exist");
      toast.error("Playlist doesn't exist", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // console.log("Toast : Some error happened");
      toast.error("Some error happened", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className="text-align-center"
      >
        <input
          className="fontsize-1rem border-radius-1rem playlist-input-border padding-0_5rem text-align-center"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="create playlist"
        />
        <button
          onClick={() => clickhandler()}
          className={
            text.length > 0
              ? "primary-playlist-btn btn-primary-active fontsize-1rem padding-0_5rem cursor-pointer"
              : "primary-playlist-btn btn-primary-disabled fontsize-1rem padding-0_5rem"
          }
          disabled={text.length > 0 ? false : true}
        >
          insert
        </button>
      </div>
      <ul className="video-container">
        {playlists.playlist.map((item) => {
          return (
            <li key={item._id} className="video-playlist-item">
              <div className="video-playlist-item-details ml-1rem">
                <p className="video-playlist-item-name">
                  <Link
                    to={`/playlist/${item.playlistcode}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {item.name}
                  </Link>
                </p>
              </div>
              <button
                onClick={() =>
                  deleteclickhandler({ playlistid: item.playlistcode })
                }
                className="video-playlist-btn-delete"
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
