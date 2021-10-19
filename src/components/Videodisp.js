import axios from "axios";
import { useEffect, useState } from "react";
import { baseurl } from "../api&url/url";

export function Videodisp({ videodocid, setModaltoggle }) {
  const [state, setState] = useState({ videocode: "" });
  const url = baseurl + "/video/thisvideo/" + videodocid;
  const yturl = "https://www.youtube-nocookie.com/embed/" + state.videocode;
  console.log("span", state);
  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const response = await axios.get(url);
        setState(response.data.videodata);
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
  }, [url]);

  return (
    <div>
      <div className="video-page-container">
        <div className="video-frame">
          <iframe
            className="video-iframe"
            src={yturl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowfullscreen"
          ></iframe>
        </div>
        <div className="video-title">
          {state.name}
          {state.prime && <span className="video-page-premium">prime</span>}
        </div>
        <div className="video-page-actions">
          <div>{state.stars} stars</div>
          <div className="video-page-controls">
            <button
              onClick={() => setModaltoggle(true)}
              className="video-page-action"
            >
              <i className="bi bi-list"></i>&nbsp;
              <p>add to playlist</p>
            </button>
          </div>
        </div>
        <div className="video-description"></div>
      </div>
    </div>
  );
}
