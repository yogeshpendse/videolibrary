import axios from "axios";
import { createContext, useContext, useState } from "react";
import { baseurl } from "../api&url/url";
export const Authcontext = createContext();

export function Authprovider({ children }) {
  const clienttoken = localStorage.getItem("token") || null;
  const loginbool = localStorage.getItem("loginbool") || false;
  const useridval = localStorage.getItem("userid") || "null";
  const [loginstatus, setLoginstatus] = useState(loginbool);
  const [authtoken, setAuthtoken] = useState(clienttoken);
  const [userid, setUserid] = useState(useridval);
  const axiosinstance = axios.create({
    baseURL: baseurl,
    headers: { authorization: clienttoken },
  });
  return (
    <Authcontext.Provider
      value={{
        userid,
        setUserid,
        loginstatus,
        setLoginstatus,
        authtoken,
        setAuthtoken,
        axiosinstance,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export function useAuthcontext() {
  return useContext(Authcontext);
}
