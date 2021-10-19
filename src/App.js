import "./styles.css";
import { data } from "./Data";
import { Reactrouter } from "./routes/Reactrouter";
import { Navbar } from "./components/Navbar";

export default function App() {
  console.log(data[1]);
  return (
    <div className="App">
      <Navbar />
      <Reactrouter />
    </div>
  );
}
