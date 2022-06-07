import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Authprovider } from "./contexts/Authprovider";
import { Vidprovider } from "./contexts/Vidprovider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Authprovider>
      <Vidprovider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Vidprovider>
    </Authprovider>
  </StrictMode>,
  rootElement
);
