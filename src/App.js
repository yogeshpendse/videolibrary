import "./styles.css";
import { data } from "./Data";
import { Reactrouter } from "./routes/Reactrouter";

export default function App() {
  console.log(data[1]);
  return (
    <div className="App">
      <Reactrouter />
    </div>
  );
}
