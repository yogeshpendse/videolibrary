import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Playlistpage } from "./pages/Playlistpage";
import { Accountpage } from "./pages/accountpage";
import { Homepage } from "./pages/homepage";
import { Navbar } from "./components/Navbar";
import { Privateroute } from "./routes/privateroutes/privateroute";
import { Playlistpageid } from "./pages/playlistpageid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Videopage from "./pages/Videopage";
import { Registerpage } from "./pages/registerpage";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/account" element={<Accountpage />} />
        <Route
          path="/playlist"
          element={
            <Privateroute>
              <Playlistpage />
            </Privateroute>
          }
        />
        <Route path="/playlist/:playlistid" element={<Playlistpageid />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/videopage/:vidid" element={<Videopage />} />
        <Route path="/account" element={<Accountpage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}
