import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../../blocks/Header.css";
import SearchForm from "../SearchForm/SearchForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import logouticon from "../../assets/header/icon/logout.png";

function Header({ onLoginClick, currentUser, handleLogout, onSearch }) {
  const location = useLocation();
  console.log(location);

  return (
    <header className="header">
      <nav className="header__links">
        <div className="header__logo">NewsExplorer</div>

        <div className="header__btns">
          <Link
            to="/"
            className={`header__link ${
              location.pathname === "/"
                ? "header__link_active"
                : "header__link_location_savednews"
            }`}
          >
            Home
          </Link>

          {currentUser ? (
            <>
              <a
                href="/saved-news"
                className={`header__link ${
                  location.pathname === "/saved-news"
                    ? "header__link_active"
                    : ""
                }`}
              >
                Saved articles
              </a>
              <button className="header__btn" onClick={handleLogout}>
                Elise
                <img
                  className="header__signout_image"
                  src={logouticon}
                  alt="logout"
                />
              </button>
            </>
          ) : (
            <button className="header__btn" onClick={onLoginClick}>
              Sign In
            </button>
          )}
        </div>
      </nav>
      <h1 className="header__title">What's going on in the world?</h1>
      <p className="header__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm onSearch={onSearch} />
    </header>
  );
}
export default Header;
