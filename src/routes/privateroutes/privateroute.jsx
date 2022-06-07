import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../contexts/Authprovider";

export function Privateroute({ children }) {
  const { loginstatus } = useAuth();
  const location = useLocation();
  if (!loginstatus) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }
  return children;
}
