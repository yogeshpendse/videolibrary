import axios from "axios";
import { useEffect, useState } from "react";
import { postaddtoplaylist } from "../apiandurls/postaddtoplaylist";
import { baseurl } from "../apiandurls/url";
import { useAuth } from "../contexts/Authprovider";
import { toast } from "react-toastify";

export function Playlistmodal(params) {
  const { currentvidid, setModaltoggle } = params;
  const [playlist, setPlayllist] = useState([]);
  const url = `${baseurl}/playlist/getallplaylist`;
  const [loader, setLoader] = useState(false);
  const { authtoken } = useAuth();
  useEffect(() => {
    setLoader(true);
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await axios.get(url, {
          signal,
          headers: { authorization: authtoken },
        });
        console.log({
          location: "playlistmodal",
          response: response.data.userplaylists,
        });
        setPlayllist(response.data.userplaylists);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        if (axios.isAxiosError(error)) {
        } else {
          console.log("some error occured");
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [url, authtoken]);
  async function clickhandler(params) {
    console.log(params);
    console.log({
      videouid: currentvidid._id,
      playlisyid: params.playlistcode,
    });
    const response = await postaddtoplaylist({
      authtoken,
      videouid: currentvidid._id,
      playlistid: params.playlistcode,
    });
    console.log(response);
    if (response.success) {
      setModaltoggle(false);
      toast.success("Added to playlist", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("An error has occured.");
      setModaltoggle(false);
      toast.error("An error has occured.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div>
      <div className="modal__overlay">
        <div className="modal">
          <div className="modal__header">Paylist</div>
          <div className="modal__content">
            {loader ? (
              <p>loader...</p>
            ) : (
              <ul>
                {[...playlist].map((item) => (
                  <li
                    key={item.playlistcode}
                    onClick={() => clickhandler(item)}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal__controls">
            <button
              className="btn btn--primary"
              onClick={() => setModaltoggle(false)}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
