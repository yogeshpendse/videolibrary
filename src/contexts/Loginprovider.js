import { createContext, useContext, useState } from "react";
export const Authcontext = createContext();

export function Authprovider({ children }) {
  const [loginstatus, setLoginstatus] = useState(false);
  return (
    <Authcontext.Provider value={{ loginstatus, setLoginstatus }}>
      {children}
    </Authcontext.Provider>
  );
}

export function useAuthcontext() {
  return useContext(Authcontext);
}
