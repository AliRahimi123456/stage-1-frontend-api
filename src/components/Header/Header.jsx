import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../../blocks/Header.css";
import SearchForm from "../SearchForm/SearchForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import NavMenu from "../NavMenu/NavMenu";
import logouticonwhite from "../../assets/logout-white-icon.svg";
import logouticon from "../../assets/logout-black-icon.svg";

function Header({
  onLoginClick,
  currentUser,
  handleLogout,
  onSearch,
  handleMenuBtnClick,
  isOpen,
}) {
  const location = useLocation();
  console.log(location);
  const isHome = location.pathname === "/";

  return (
    <header className={`header ${isHome ? "" : "header__saved-articles"}`}>
      <nav className={`header__nav ${isHome ? "" : "header-nav__theme-light"}`}>
        <div className="header__logo">NewsExplorer</div>
        {!isOpen && (
          <button
            className={`header-menu__btn ${!isHome && "header-menu__black"}`}
            onClick={handleMenuBtnClick}
          ></button>
        )}

        <div className="header__actions">
          <Link
            to="/"
            className={`header__link ${
              isHome
                ? "header-link__active"
                : "header-link__location-savednews header-link__theme-light"
            }`}
          >
            Home
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/saved-news"
                className={`header__link ${
                  isHome ? "" : "header__link_active header-link__theme-light"
                }`}
              >
                Saved articles
              </Link>
              <button
                className={`header__btn ${
                  isHome ? "" : "header-btn__theme-light"
                }`}
                onClick={handleLogout}
              >
                Elise
                <img
                  className="header-signout__icon"
                  src={isHome ? logouticonwhite : logouticon}
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
      {isHome ? (
        <>
          <h1 className="header__title">What's going on in the world?</h1>
          <p className="header__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} />
        </>
      ) : null}
    </header>
  );
}
export default Header;
