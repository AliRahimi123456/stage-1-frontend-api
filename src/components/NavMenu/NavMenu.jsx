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
    <div className={`nav-menu ${isOpen ? "nav-menu__opened" : ""}`}>
      <div className="nav-menu__header">
        <span className="nav-menu__logo">NewsExplorer</span>
        <button className="nav-menu__close-btn" onClick={onClose} />
      </div>
      <ul className="nav-menu__content">
        <Link
          to="/"
          className={`nav-menu__link 
          ${isHome ? "nav-menu__link-active" : ""}`}
          onClick={onClose}
        >
          Home
        </Link>
        {currentUsser ? (
          <>
            <Link
              to="/saved-news"
              className={`nav-menu__link ${
                !isHome ? "" : "nav-menu__link-active"
              }`}
              onClick={onClose}
            >
              Saved articles{" "}
            </Link>

            <button
              className={`nav-menu__logout-btn ${
                isHome ? "" : "nav-menu__logout_btn_theme-light"
              }`}
              onClick={handleLogout}
            >
              {/* Elise */}
              <img
                className="nav-menu__signout-icon"
                src={logouticonwhite}
                alt="logout"
              />
            </button>
          </>
        ) : (
          <li className="nav-menu__signin-container">
            <button className="nav-menu__signin-btn" onClick={onSignInClick}>
              Sign In
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavMenu;
