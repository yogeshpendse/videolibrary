import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isStrongPassword } from "validator";
import { baseurl } from "../api&url/url";
export function Registerpage() {
  const [usernameval, setUsernameval] = useState("");
  const [nameval, setNameval] = useState("");
  const [passwordval, setPassword] = useState("");
  const passwordvalidation = isStrongPassword(passwordval);
  const disablestatus =
    usernameval.length > 0 && passwordvalidation && nameval.length > 0;
  const handleusername = (e) => setUsernameval(e);
  const handlepassword = (e) => setPassword(e);
  const handlename = (e) => setNameval(e);
  async function checkregister() {
    try {
      const url = baseurl + "/user/signup";
      const response = await axios.post(url, {
        username: usernameval,
        name: nameval,
        password: passwordval,
      });
      console.log(response);
      if (response.status === 200) {
        // console.log("Toast : User created");
        toast.success("User created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNameval("");
        setUsernameval("");
        setPassword("");
        return { boolval: true, message: "registration successfull" };
      } else {
        // console.log("Toast : Some error occured");
        toast.error("Some error occured", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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
      return { boolval: false, errormessage: error.response.data.message };
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
    const success_status = checkregister();
    if (success_status.boolval) {
      // console.log("Toast : ", { message: success_status.message });
      toast.success("success_status.message", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setNameval("");
      setUsernameval("");
      setPassword("");
    } else {
      console.log("Toast : ", { message: success_status.errormessage });
      toast.error(success_status.errormessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setNameval("");
      setUsernameval("");
      setPassword("");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="mt-5rem">
        <div className="input-form">
          <div className="input-elements">
            <input
              value={nameval}
              className="input-element"
              placeholder="name"
              onChange={(e) => handlename(e.target.value)}
            />
            <input
              value={usernameval}
              className="input-element"
              placeholder="username"
              onChange={(e) => handleusername(e.target.value)}
            />
            <input
              value={passwordval}
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
            >
              signup
            </button>
            <Link className="input-toggle-button text-align-center" to="/acc">
              <p className="text-decoration-underline">
                Already have an account?
              </p>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
