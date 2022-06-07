import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [navbartgl, setNavbartgl] = useState(false);
  return (
    <nav className="navbar sticky lift-navbar">
      <div className="navbar__container">
        <Link className="navbar__brand" to="/">
          InfoFlix
        </Link>
        <ul className="navbar__links">
          <li className="navbar__link">
            <Link className="navbar__dlink" to="/">
              home
            </Link>
          </li>
          <li className="navbar__link">
            <Link className="navbar__dlink" to="/playlist">
              playlist
            </Link>
          </li>
          <li className="navbar__link">
            <Link className="navbar__dlink" to="/account">
              account
            </Link>
          </li>
        </ul>
        <div className="navbar__togglebox">
          <button
            onClick={() => setNavbartgl(!navbartgl)}
            className="navbar__toggle"
          >
            {navbartgl ? (
              <i className="bi bi-x" />
            ) : (
              <i className="bi bi-list" />
            )}
          </button>
        </div>
      </div>
      <div
        className={
          navbartgl
            ? "navbar__dropdown navbar__dropdown--open"
            : "navbar__dropdown"
        }
      >
        <ul className="navbar__dlinks">
          <li>
            <Link className="navbar__dlink" to="/">
              home
            </Link>
          </li>
          <li>
            <Link className="navbar__dlink" to="/playlist">
              playlist
            </Link>
          </li>
          <li>
            <Link className="navbar__dlink" to="/account">
              account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
