import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthcontext } from "../contexts/Loginprovider";
import axios from "axios";
import { baseurl } from "../api&url/url";

export function Logger() {
  // loginstatus,
  const { setLoginstatus, setAuthtoken, setUserid, userid } = useAuthcontext();
  const { state } = useLocation();
  const [usernameval, setUsernameval] = useState("");
  const [passwordval, setPassword] = useState("");
  const disablestatus = usernameval.length > 0 && passwordval.length;
  const navigate = useNavigate();
  console.log("state", state);
  // function handler() {
  //   setLoginstatus(!loginstatus);
  //   state?.from && navigate(state.from);
  // }
  async function checklogin() {
    try {
      const url = baseurl + "/user/login";
      const response = await axios.post(url, {
        username: usernameval,
        password: passwordval,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loginbool", response.data.success);
        localStorage.setItem("userid", response.data.userid);
        setUserid(response.data.userid);
        setLoginstatus(response.data.success);
        setAuthtoken(response.data.token);
        // console.log({ statevalue: state.from });
        state?.from && navigate(state.from || "/");
      }
    } catch (error) {
      console.log({ errormessage: error.message });
    }
  }
  const handleusername = (e) => setUsernameval(e);
  const handlepassword = (e) => setPassword(e);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginbool");
    localStorage.removeItem("userid");
    setLoginstatus(false);
    setAuthtoken(null);
    window.location.reload();
  };
  const onSubmit = (event) => {
    event.preventDefault();
    checklogin();
  };

  return (
    <div>
      {/* <h1>loginstatus &nbsp;{loginstatus ? "true" : "false"}</h1> */}
      {/* <button onClick={handler}>{loginstatus ? "logout" : "login"}</button> */}
      <form onSubmit={onSubmit}>
        <div className="input-form">
          <div className="input-elements">
            <input
              className="input-element"
              placeholder="username"
              onChange={(e) => handleusername(e.target.value)}
            />
            <input
              className="input-element"
              placeholder="password"
              onChange={(e) => handlepassword(e.target.value)}
            />
            <button
              type="submit"
              className={
                disablestatus
                  ? "input-element btn btn-primary cursor-pointer"
                  : "input-form-submit-disabled"
              }
              disabled={!disablestatus}
              onClick={checklogin}
            >
              login
            </button>
            <button
              type="submit"
              className="input-element btn btn-primary cursor-pointer"
              onClick={logout}
            >
              logout
            </button>
            <h3>{userid}</h3>
            {/* <Link
              className="input-toggle-button text-align-center"
              to="/signup"
            >
              <p className="text-decoration-underline">
                Don't have an account?
              </p>
            </Link> */}
          </div>
        </div>
      </form>
    </div>
  );
}
