import { useLocation, useNavigate } from "react-router-dom";
import { useAuthcontext } from "../contexts/Loginprovider";

export function Logger() {
  const { loginstatus, setLoginstatus } = useAuthcontext();
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("state", state);
  function handler() {
    setLoginstatus(!loginstatus);
    state?.from && navigate(state.from);
  }

  return (
    <div>
      <h1>loginstatus &nbsp;{loginstatus ? "true" : "false"}</h1>
      <button onClick={handler}>{loginstatus ? "logout" : "login"}</button>
    </div>
  );
}
