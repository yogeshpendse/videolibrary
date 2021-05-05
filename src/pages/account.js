// import { useLocation } from "react-router-dom";
import { Logger } from "../components/Logger";
import { Navbar } from "../components/Navbar";

export function Account() {
  return (
    <div>
      <Navbar />
      <h1>Yeh Account page hai</h1>
      <Logger />
    </div>
  );
}
