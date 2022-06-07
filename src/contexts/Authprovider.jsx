import { createContext, useContext, useState } from "react";
const Authcontext = createContext();
export function Authprovider({ children }) {
  const clienttoken = localStorage.getItem("token") || null;
  const loginbool = localStorage.getItem("loginbool") || false;
  const useridval = localStorage.getItem("userid") || "null";
  const [loginstatus, setLoginstatus] = useState(loginbool);
  const [authtoken, setAuthtoken] = useState(clienttoken);
  const [userid, setUserid] = useState(useridval);
  return (
    <Authcontext.Provider
      value={{
        loginstatus,
        setLoginstatus,
        authtoken,
        setAuthtoken,
        userid,
        setUserid,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}
export const useAuth = () => useContext(Authcontext);
