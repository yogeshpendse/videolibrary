import { NavLink } from "react-router-dom";
export function Navbar() {
  return (
    <div>
      <header>
        <nav className="navbar-main">
          <h1 className="navbar-main-header">jigyasa-stream</h1>
          <ul className="navbar-main-ul">
            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                end
                activeClassName="navbar-main-ul-a"
                to="/"
              >
                home
              </NavLink>
            </li>
            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/playlist"
              >
                playlist
              </NavLink>
            </li>
            <li className="navbar-main-links">
              <NavLink
                className="navbar-main-ul-ua"
                activeClassName="navbar-main-ul-a"
                to="/acc"
              >
                account
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
