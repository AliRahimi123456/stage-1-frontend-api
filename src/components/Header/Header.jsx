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
      <nav
        className={`header__links ${isHome ? "" : "header__links_theme_light"}`}
      >
        <div className="header__logo">NewsExplorer</div>
        {!isOpen && (
          <button
            className={`header__menu-btn ${!isHome && "header__menu_black"}`}
            onClick={handleMenuBtnClick}
          ></button>
        )}

        <div className="header__btns">
          <Link
            to="/"
            className={`header__link ${
              isHome
                ? "header__link_active"
                : "header__link_location_savednews header__link_theme_light"
            }`}
          >
            Home
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/saved-news"
                className={`header__link ${
                  isHome ? "" : "header__link_active header__link_theme_light"
                }`}
              >
                Saved articles
              </Link>
              <button
                className={`header__btn ${
                  isHome ? "" : "header__btn_theme_light"
                }`}
                onClick={handleLogout}
              >
                Elise
                <img
                  className="header__signout_image"
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
          <p className="header__text">
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
