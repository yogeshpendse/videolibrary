import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Myloader } from "../components/Myloader";
import { postdeletefromplaylist } from "../apiandurls/postdeletefromplaylist";
import { baseurl } from "../apiandurls/url";
import { useAuth } from "../contexts/Authprovider";
import { Link } from "react-router-dom";
import "../csslayouts/playlistidpagelayout.css";

export function Playlistpageid() {
  const { playlistid } = useParams();
  const { authtoken } = useAuth();
  const [loader, setLoader] = useState(true);
  const [playlistvids, setPlaylistvidz] = useState([]);
  console.log(playlistid);
  const url = `${baseurl}/video/${playlistid}`;
  const hy = !loader && [...playlistvids].length === 0 ? true : false;
  async function handlevideodelete({ videouid }) {
    const response = await postdeletefromplaylist({
      videouid,
      playlistid,
      authtoken,
    });
    console.log({ response });
    if (response.success) {
      const newlist = [...playlistvids].filter((item) => item._id !== videouid);
      setPlaylistvidz(newlist);
      console.log("An error occured");
    } else {
      console.log("An error occured");
    }
  }
  useEffect(() => {
    let controller = new AbortController();
    const signal = controller.signal;
    setLoader(true);
    (async function () {
      try {
        console.log("fetching...");
        const response = await axios.get(url, {
          headers: { authorization: authtoken },
          signal: signal,
        });
        setPlaylistvidz(response.data.videosdata);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        if (axios.isCancel(error)) {
          console.log("Request canceled :", error.message);
        } else {
          console.log(error);
        }
      }
    })();

    return () => {
      setLoader(false);
      controller.abort();
    };
  }, [url, authtoken]);

  return (
    <div className="playlistidpage">
      <div className="playlistidpage__vidcontainer">
        {hy && <h1>No videos in this playlist.</h1>}
        {!loader ? (
          [...playlistvids].map((item) => (
            <div className="playlistidpage__vidbox" key={item._id}>
              {[...playlistvids].length > 0 && (
                <>
                  <Link
                    className="playlistidpage__vidcont"
                    to={`/videopage/${item._id}`}
                  >
                    <img
                      className="playlistidpage__thumbnail"
                      src={item.thumbnail}
                      alt="thumbnail"
                    />
                    <p className="playlistidpage__vidname">{item.name}</p>
                  </Link>
                  <button
                    className="btn btn-red"
                    onClick={() => handlevideodelete({ videouid: item._id })}
                  >
                    <i className="bi bi-trash3" />
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <Myloader />
        )}
      </div>
    </div>
  );
}
