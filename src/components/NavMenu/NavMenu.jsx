import { useContext, useEffect } from "react";
import "../../blocks/NavMenu.css";
import { useLocation, Link } from "react-router-dom";
import { CurrentUserContext } from "../../utils/context/CurrentUser";
import logouticonwhite from "../../assets/logout-white-icon.svg";
import logouticon from "../../assets/logout-black-icon.svg";

function NavMenu({ isOpen, onClose, onSignInClick, handleLogout }) {
  const currentUsser = useContext(CurrentUserContext);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className={`nav-menu ${isOpen ? "nav__menu_opened" : ""}`}>
      <div className="nav__menu_header">
        <span className="nav__menu_logo">NewsExplorer</span>
        <button className="nav__menu_close_btn" onClick={onClose} />
      </div>
      <ul className="nav__menu_content">
        <Link
          to="/"
          className={`nav__menu_link 
          ${isHome ? "nav__menu_link_active" : ""}`}
          onClick={onClose}
        >
          Home
        </Link>
        {currentUsser ? (
          <>
            <Link
              to="/saved-news"
              className={`nav__menu_link ${
                !isHome ? "" : "nav__menu_link_active"
              }`}
              onClick={onClose}
            >
              Saved articles{" "}
            </Link>

            <button
              className={`nav__menu_logout_btn ${
                isHome ? "" : "nav__menu_logout_btn_theme_light"
              }`}
              onClick={handleLogout}
            >
              {/* Elise */}
              <img
                className="nav__menu_signout_icon"
                src={logouticonwhite}
                alt="logout"
              />
            </button>
          </>
        ) : (
          <li className="nav__menu_signin_container">
            <button className="nav__menu_signin_btn" onClick={onSignInClick}>
              Sign In
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavMenu;
