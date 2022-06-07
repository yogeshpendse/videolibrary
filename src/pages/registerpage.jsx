import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { isStrongPassword } from "validator";
import { baseurl } from "../apiandurls/url";
import "../csslayouts/registerpage.css";
export function Registerpage() {
  const [usernameval, setUsernameval] = useState("");
  const [passwordval, setPasswordval] = useState("");
  const [nameval, setNameval] = useState("");
  const [loader, setLoader] = useState(false);
  const passwordvalidation = isStrongPassword(passwordval);
  const disablestatus =
    usernameval.length > 0 && passwordvalidation && nameval.length > 0
      ? true
      : false;
  async function checkregister() {
    try {
      setLoader(true);
      const url = `${baseurl}/user/signup`;
      const response = await axios.post(url, {
        username: usernameval,
        name: nameval,
        password: passwordval,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("User created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // return { boolval: true, message: "registration successfull" };
      }
      setLoader(false);
    } catch (error) {
      // console.log({ errormessage: error.response.data.message });
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //   return { boolval: false, errormessage: error.response.data.message };
      setLoader(false);
    } finally {
      setNameval("");
      setUsernameval("");
      setPasswordval("");
    }
  }
  return (
    <>
      <div className="registerpage">
        <input
          value={nameval}
          className="input registerpage__fields"
          type="text"
          placeholder="name"
          onChange={(event) => setNameval(event.target.value)}
        />
        <input
          value={usernameval}
          className="input registerpage__fields"
          type="text"
          placeholder="username"
          onChange={(event) => setUsernameval(event.target.value)}
        />
        <input
          className="input registerpage__fields"
          type="text"
          value={passwordval}
          placeholder="password"
          onChange={(event) => setPasswordval(event.target.value)}
        />
        <button
          className={disablestatus ? "btn btn--primary" : "btn btn--disabled"}
          onClick={() => checkregister()}
          disabled={disablestatus ? false : true}
        >
          signup&nbsp;{loader && <span className="myloader-sm"></span>}
        </button>
        <div className="registerpage__register">
          <Link to="/account">Have an account?</Link>
        </div>
      </div>
    </>
  );
}
