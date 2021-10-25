import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthcontext } from "../contexts/Loginprovider";
import axios from "axios";
import { baseurl } from "../api&url/url";

export function Logger() {
  const { setLoginstatus, setAuthtoken, setUserid, userid } = useAuthcontext();
  const { state } = useLocation();
  const [usernameval, setUsernameval] = useState("");
  const [passwordval, setPassword] = useState("");
  const disablestatus = usernameval.length > 0 && passwordval.length;
  const useridstatus = userid === "null" ? true : false;
  const navigate = useNavigate();
  async function checklogin() {
    try {
      const url = baseurl + "/user/login";
      const response = await axios.post(url, {
        username: usernameval,
        password: passwordval,
      });
      console.log({ response });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loginbool", response.data.success);
        localStorage.setItem("userid", response.data.userid);
        console.log("login success");
        setUserid(response.data.userid);
        setLoginstatus(true);
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
    setUserid("null");
    // window.location.reload();
  };
  const onSubmit = (event) => {
    event.preventDefault();
    checklogin();
  };
  console.log(typeof userid);
  return (
    <div>
      {useridstatus ? (
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
                    ? "input-element btn btn-primary-active cursor-pointer"
                    : "input-form-submit-disabled"
                }
                disabled={!disablestatus}
                onClick={checklogin}
              >
                login
              </button>
              <Link
                className="input-toggle-button text-align-center"
                to="/register"
              >
                <p className="text-decoration-underline">
                  Don't have an account?
                </p>
              </Link>
            </div>
          </div>
        </form>
      ) : (
        <div className="display-flex  justify-content-center">
          <button
            className="input-element btn btn-primary-active cursor-pointer"
            onClick={logout}
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
}
