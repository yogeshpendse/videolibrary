import { Navigate, Route } from "react-router-dom";
import { useAuthcontext } from "../../contexts/Loginprovider";
export function Privatrouter(params) {
  const { path, ...rest } = params;
  const { loginstatus } = useAuthcontext();
  return loginstatus ? (
    <Route path={path} {...rest} />
  ) : (
    <Navigate state={{ from: path }} replace to="/acc" />
  );
}
