import axios from "axios";
import "../csslayouts/Videopagelayout.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseurl } from "../apiandurls/url";
import { Playlistmodal } from "../components/Playlistmodal";
import { useAuth } from "../contexts/Authprovider";
import { toast } from "react-toastify";

function Videopage() {
  const { vidid } = useParams();
  const { authtoken, loginstatus } = useAuth();
  const [modaltoogle, setModaltoogle] = useState(false);
  const url = `${baseurl}/video/thisvideo/${vidid}`;
  const [viddata, setViddata] = useState({});
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await axios.get(url, { signal });
        if (response.data.success) {
          console.log({ response: response.data.videodata });
          setViddata(response.data.videodata);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("unmounted");
        } else {
          console.log("an error has occured");
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [url]);

  return (
    <div className="videopage">
      <div className="videopage__container">
        <iframe
          className="videopage__frame"
          src={`https://www.youtube.com/embed/${viddata.videocode}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <p className="videopage__name">
          {viddata.name}
          {viddata.prime && (
            <span className="videopage__prime">
              <i className="bi bi-award-fill" />
            </span>
          )}
        </p>
        <button
          onClick={() => {
            if (loginstatus) {
              setModaltoogle(true);
            } else {
              toast.error("Please login.", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }}
          className="btn btn--olprimary"
        >
          add to playlist
        </button>
      </div>
      {modaltoogle && authtoken && (
        <Playlistmodal currentvidid={viddata} setModaltoggle={setModaltoogle} />
      )}
    </div>
  );
}

export default Videopage;
