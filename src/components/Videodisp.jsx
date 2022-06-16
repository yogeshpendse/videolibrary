import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../apiandurls/url";
import { Link } from "react-router-dom";
import { useVidcontext } from "../contexts/Vidprovider";
import {
  filteronlypro,
  searchfilter,
  sortfilter,
  timefilters,
} from "../function/filters";
import { useAuth } from "../contexts/Authprovider";
import { toast } from "react-toastify";
import { Myloader } from "./Myloader";

export function Videodisp(params) {
  const { setCurrentvidid, setModaltoggle } = params;
  const url = `${baseurl}/video/getallvideos`;
  const [videoarray, setVideoArray] = useState([]);
  const [loader, setLoader] = useState(true);
  const { controls } = useVidcontext();
  const searchterm = controls.searchterm;
  const onlypro = controls.onlypro;
  const shortdocs = controls.shortdocs;
  const sortby = controls.sortby;
  const array = filteronlypro(videoarray, onlypro);
  const array2 = timefilters(array, shortdocs);
  const array3 = sortfilter(array2, sortby);
  const array4 = searchfilter(array3, searchterm);
  const { loginstatus } = useAuth();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    setLoader(true);
    let controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      try {
        await sleep(2000);
        const response = await axios.get(url, { signal: signal });
        const data = response.data.data;
        setVideoArray(data);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        if (axios.isCancel(error)) {
          // console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      }
    })();
    return () => {
      console.log("running cleanup...");
      setLoader(false);
      controller.abort();
    };
  }, [url]);
  return (
    <>
      {loader ? (
        <Myloader />
      ) : (
        <>
          {[...array4].length === 0 && (
            <center>
              <h1>No videos left</h1>
            </center>
          )}
          <div className="grid grid__col--3 vcard-container">
            {[...array4].map((item) => (
              <div className="vcard" key={item._id}>
                <div className="vcard__imagebox">
                  <img
                    className="vcard__image"
                    src={item.thumbnail}
                    alt="video thumbnail"
                  />
                  <p className="vcard__timestamp">{item.time} min</p>
                  <button
                    className="vcard__playlist"
                    onClick={() => {
                      if (loginstatus) {
                        setCurrentvidid(item);
                        setModaltoggle(true);
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
                  >
                    <i className="bi bi-list" />
                  </button>
                </div>
                <div className="vcard__details">
                  <Link to={`/videopage/${item._id}`} className="vcard__name">
                    {item.name}
                  </Link>
                </div>
                <Link to={`/videopage/${item._id}`} className="vcard__view">
                  view
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
