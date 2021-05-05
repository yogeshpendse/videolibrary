import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Vidprovider } from "./contexts/Vidprovider";
import { BrowserRouter as Router } from "react-router-dom";
import { Authprovider } from "./contexts/Loginprovider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <Authprovider>
        <Vidprovider>
          <App />
        </Vidprovider>
      </Authprovider>
    </Router>
  </StrictMode>,
  rootElement
);
