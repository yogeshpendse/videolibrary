import { Route, Routes } from "react-router-dom";
import { Account } from "../pages/account";
import { Hompeage } from "../pages/homepage";
import { Playlistviewpage } from "../pages/playlistviewpage";
import { Playlist } from "../pages/private/playlist";
import { Registerpage } from "../pages/registerpage";
import { Vidpage } from "../pages/videopage";
import { Privatrouter } from "./privateroutes/privateroute";

export function Reactrouter() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Hompeage />} />
        <Route exact path="/acc" element={<Account />} />
        <Route exact path="/videopage/:id" element={<Vidpage />} />
        <Route exact path="/playlist/videopage/:id" element={<Vidpage />} />
        <Route exact path="/register" element={<Registerpage />} />
        <Privatrouter path="/playlist" element={<Playlist />} />
        {/* <Privatrouter
          path="/playlist/:playlistid"
          element={<Playlistviewpage />}
        /> */}
        <Route
          exact
          path="/playlist/:playlistid"
          element={<Playlistviewpage />}
        />
      </Routes>
    </div>
  );
}
