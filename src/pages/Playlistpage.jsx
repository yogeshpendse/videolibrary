import { useAuth } from "../contexts/Authprovider";
import { baseurl } from "../apiandurls/url";
import "../csslayouts/playlistpagelayout.css";
import { Myloader } from "../components/Myloader";
import { createplaylist } from "../apiandurls/createplaylist";
import axios from "axios";
import { useEffect, useState } from "react";
import { postdeleteplaylist } from "../apiandurls/postdeleteplaylist";
import { Link } from "react-router-dom";
export function Playlistpage() {
  const { authtoken, userid } = useAuth();
  const [loader, setloader] = useState(false);
  const [text, setText] = useState("");
  const [playlist, setPlayllist] = useState([]);
  // const url = baseurl + "/playlist/getallplaylist";
  const url = `${baseurl}/playlist/getallplaylist`;
  async function addplaylist() {
    const plid = Date.now();
    console.log({ plid });
    const response = await createplaylist({ plid, authtoken, name: text });
    if (response.success) {
      console.log("playlist create");
      console.log(response);
      const playlistitem = {
        _id: JSON.stringify(plid),
        name: text,
        playlistcode: response.response.playlistcode,
        userid,
        videos: [],
      };
      setPlayllist([playlistitem, ...playlist]);
      setText("");
    } else {
      console.log("playlist creation failed");
    }
  }
  async function handleplaylistdelete(params) {
    const { playlistid } = params;
    console.log(playlistid);
    const response = await postdeleteplaylist({ authtoken, playlistid });
    if (response.success) {
      console.log("api deleted");
      const filtplaylist = [...playlist].filter(
        (item) => item.playlistcode !== playlistid
      );
      console.log(filtplaylist);
      setPlayllist(filtplaylist);
    }
  }
  useEffect(() => {
    setloader(true);
    let controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      try {
        const response = await axios.get(url, {
          headers: { authorization: authtoken },
          signal: signal,
        });
        if (response.status === 200) {
          setPlayllist(response.data.userplaylists);
        }
        setloader(false);
      } catch (error) {
        setloader(false);
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      }
    })();
    return () => {
      setloader(false);
      controller.abort();
    };
  }, [authtoken, url]);
  return (
    <div className="playlistpage">
      <center className="playlistpage_inputcontainer">
        <input
          className="input mr-2"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          className="btn btn--primary"
          onClick={() => addplaylist()}
          disabled={text.length > 0 ? false : true}
        >
          create
        </button>
      </center>
      {loader ? (
        <Myloader />
      ) : (
        <div className="playlistpage__playlistcontainer">
          <div className="playlistpage__playboxcont">
            {[...playlist].map((item) => (
              <div className="playlistpage__playbox" key={item._id}>
                <Link to={`/playlist/${item.playlistcode}`}>
                  <h1>{item.name}</h1>
                </Link>
                <button
                  onClick={() =>
                    handleplaylistdelete({ playlistid: item.playlistcode })
                  }
                  className="btn btn-red"
                >
                  delete&nbsp;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
