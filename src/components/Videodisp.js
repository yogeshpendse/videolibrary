import axios from "axios";
import { useEffect, useState } from "react";
import { baseurl } from "../api&url/url";

export function Videodisp({ videodocid, setModaltoggle }) {
  // console.log("viddata", viddata);
  const [state, setState] = useState({ videocode: "" });
  const url = baseurl + "/video/thisvideo/" + videodocid;
  const yturl = "https://www.youtube-nocookie.com/embed/" + state.videocode;
  // const url1 = `https://www.youtube-nocookie.com/embed/${viddata.videocode}`;
  // const finurl = String(url1);
  // console.log("finurl", finurl);
  // fetch video data
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
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "black",
        }}
      >
        <iframe
          width="50%"
          src={yturl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ aspectRatio: "16/9" }}
        ></iframe>
      </div>
      <h3 style={{ textAlign: "center" }}>
        {state.name}
        <button onClick={() => setModaltoggle(true)}>add to playlist</button>
      </h3>
    </div>
  );
}
