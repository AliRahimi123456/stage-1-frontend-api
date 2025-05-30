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
        <span>NewsExplorer</span>
        <button className="nav-menu__close-btn" onClick={onClose} />
      </div>
      <ul className="nav-menu__content">
        <Link
          to="/"
          className={`nav-menu__home-btn 
          ${isHome ? "nav-menu__home-btn_active" : ""}`}
          onClick={onClose}
        >
          Home
        </Link>
        {currentUsser ? (
          <>
            <Link
              to="/saved-news"
              className={`nav-menu__savedarticles_btn ${
                !isHome ? "" : "nav-menu__savedarticles-btn_active"
              }`}
              onClick={onClose}
            >
              Saved articles{" "}
            </Link>

            <button
              className={`nav-menu__logout-btn ${
                isHome ? "" : "nav-menu__btn_theme_light"
              }`}
              onClick={handleLogout}
            >
              {/* Elise */}
              <img
                className="nav-menu__signout_image"
                src={logouticonwhite}
                alt="logout"
              />
            </button>
          </>
        ) : (
          <li>
            <div className="nave-menu_signin_btn_container">
              <button className="nav-menu__signin-btn" onClick={onSignInClick}>
                Sign In
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavMenu;
