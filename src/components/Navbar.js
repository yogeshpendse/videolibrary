import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../cssforcomponents/navbarcss.css";
import { useWidth } from "../customhooks/useWidth";
export function Navbar() {
  const [state, setState] = useState(false);
  const hookval = useWidth();
  const width = hookval.width || window.innerWidth;
  const screensizetoggle = width > 600 ? true : false;
  // const lo = [
  //   { link: "/", location: "home" },
  //   { link: "/playlist", location: "playlist" },
  //   { link: "/acc", location: "account" },
  // ];
  return (
    <div>
      <header>
        <nav className="color-fixes">
          <div className="Navbar">
            <h3 style={{ paddingLeft: "1rem", fontStyle: "italic" }}>
              InfoFlix
            </h3>
            {screensizetoggle ? (
              <div className="display-list">
                <span>
                  <NavLink
                    end
                    className="navbar-link"
                    // activeClassName="navbar-main-ul-a"
                    to="/"
                  >
                    home
                  </NavLink>
                </span>
                <span>
                  <NavLink
                    className="navbar-link"
                    // activeClassName="navbar-main-ul-a"
                    to="/playlist"
                  >
                    playlist
                  </NavLink>
                </span>
                <span>
                  <NavLink
                    className="navbar-link"
                    // activeClassName="navbar-main-ul-a"
                    to="/acc"
                  >
                    account
                  </NavLink>
                </span>
              </div>
            ) : (
              <>
                <button className="toggler" onClick={() => setState(!state)}>
                  {state ? (
                    <>
                      <i className="bi bi-x-lg"></i>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-list"></i>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
          {screensizetoggle === false && state && <Listval />}
        </nav>
      </header>
    </div>
  );
}

function Listval(state) {
  return (
    <>
      <ul className="links ml-1rem">
        <li className="links-item">
          <NavLink end className="navbar-link" to="/">
            home
          </NavLink>
        </li>
        <li className="links-item">
          <NavLink className="navbar-link" to="/playlist">
            playlist
          </NavLink>
        </li>
        <li className="links-item">
          <NavLink className="navbar-link" to="/acc">
            account
          </NavLink>
        </li>
      </ul>
    </>
  );
}
