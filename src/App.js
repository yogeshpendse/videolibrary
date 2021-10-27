import "./styles.css";
import { data } from "./Data";
import { Reactrouter } from "./routes/Reactrouter";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  console.log(data[1]);
  return (
    <div className="App">
      <Navbar />
      <Reactrouter />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
