import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { baseurl } from "../apiandurls/url";
import "../csslayouts/accountpage.css";
import { useAuth } from "../contexts/Authprovider";
import { toast } from "react-toastify";
export function Accountpage() {
  const [usernameval, setUsernameval] = useState("testuser"); //testuser users
  const [passwordval, setPasswordval] = useState("Test@123"); //Test@123 User@123
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.pathname || "/";

  const url = `${baseurl}/user/login`;
  const { setLoginstatus, setAuthtoken, setUserid, loginstatus } = useAuth();
  const passwordbool = passwordval.length > 0 ? false : true;
  const usernamebool = usernameval.length > 0 ? false : true;
  const disabledstatus =
    passwordbool === false && usernamebool === false ? false : true;
  async function checklogin() {
    setLoader(true);
    try {
      const response = await axios.post(url, {
        username: usernameval,
        password: passwordval,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userid", response.data.userid);
      localStorage.setItem("loginbool", true);
      setAuthtoken(response.data.token);
      setLoginstatus(true);
      setUserid(response.data.userid);
      setLoader(false);
      navigate(from);
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.errormessage, {
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
  function handlelogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("loginbool");
    setAuthtoken(null);
    setLoginstatus(false);
    setUserid("null");
  }

  return (
    <div>
      {loginstatus ? (
        <div className="accountpage">
          <button className="btn btn--primary" onClick={() => handlelogout()}>
            logout
          </button>
        </div>
      ) : (
        <div className="accountpage">
          <input
            value={usernameval}
            className="input accountpage__fields"
            type="text"
            placeholder="username"
            onChange={(event) => setUsernameval(event.target.value)}
          />
          <input
            className="input accountpage__fields"
            type="password"
            value={passwordval}
            placeholder="password"
            onChange={(event) => setPasswordval(event.target.value)}
          />
          <button
            className="btn btn--primary"
            onClick={() => checklogin()}
            disabled={disabledstatus}
          >
            login&nbsp;{loader && <span className="myloader-sm"></span>}
          </button>
          <div className="accountpage__register">
            <Link to="/register">Don't have an account.</Link>
          </div>
        </div>
      )}
    </div>
  );
}
