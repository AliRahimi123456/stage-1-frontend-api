import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import SavedNews from "./components/SavedNews/SavedNews";
import NavMenu from "./components/NavMenu/NavMenu";
import {
  registerUser,
  loginUser,
  getNewsArticles,
  checkToken,
  saveArticle,
  deleteArticle,
} from "./utils/api";
import { CurrentUserContext } from "./utils/context/CurrentUser";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [cards, setCards] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setUser(res.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          handleLogout();
        });
    }
  }, []);

  const handleCardSave = (card) => {
    console.log("Before save - savedCards:", savedCards);
    const isSaved = savedCards.some((c) => c.url === card.url);
    console.log("Is card already saved?", isSaved);
    card.keyword = keyword;
    if (!isSaved) {
      console.log("Adding card to savedCards:", card);
      saveArticle(card).then((newArticle) => {
        setSavedCards([...savedCards, newArticle]);
      });

      setTimeout(() => {
        console.log("savedCards after timeout:", savedCards);
      }, 2000);
    }
  };

  const handleCardDelete = (cardToDelete) => {
    console.log("Deleting card:", cardToDelete);
    deleteArticle(cardToDelete._id)
      .then(() => {
        setSavedCards((prevSavedCards) =>
          prevSavedCards.filter(
            (card) => card.urlToImage !== cardToDelete.urlToImage
          )
        );
      })
      .catch((err) => {
        console.error("Failed to delete article:", err);
      });
  };

  const handleSearchSubmit = (searchTerm) => {
    setKeyword(searchTerm);
    getNewsArticles(searchTerm)
      .then((data) => {
        setCards(data.articles);
        setShowSearchResult(true);
      })
      .catch((error) => console.error("Error fetching news articles:", error));
  };

  const onLogInClick = () => {
    setActiveModal("login-modal");
    handleCloseMenu();
  };

  const onSignUpClick = () => {
    setActiveModal("register-modal");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogin = (credentials) => {
    loginUser(credentials)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          checkToken(res.token).then((res) => {
            setUser(res.data);
            setActiveModal("");
          });
        }
      })
      .catch((err) => console.error("Login failed:", err));
  };

  const handleRegister = (userData) => {
    registerUser(userData)
      .then((res) => {
        if (res.email) {
          handleLogin({ email: userData.email, password: userData.password });
          closeActiveModal();
        }
      })
      .catch((err) => console.error("Error during registration:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleCardClick = (card) => {
    console.log("Clicked card:", card);
  };

  const handleMenuBtnClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <Header
          onLoginClick={onLogInClick}
          handleLogin={handleLogin}
          currentUser={user}
          handleLogout={handleLogout}
          onSearch={handleSearchSubmit}
          handleMenuBtnClick={handleMenuBtnClick}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                cards={cards}
                onCardClick={handleCardClick}
                handleCardSave={handleCardSave}
                showSearchResult={showSearchResult}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedCards={savedCards}
                handleCardDelete={handleCardDelete}
                handleCardClick={handleCardClick}
                handleCardSave={handleCardSave}
              />
            }
          />
        </Routes>

        <RegisterModal
          isOpen={activeModal === "register-modal"}
          onClose={closeActiveModal}
          onRegister={handleRegister}
          onLogInClick={onLogInClick}
        />

        <LoginModal
          isOpen={activeModal === "login-modal"}
          onClose={closeActiveModal}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          onSignUpClick={onSignUpClick}
        />
        <NavMenu
          isOpen={isMenuOpen}
          onClose={handleCloseMenu}
          onSignInClick={onLogInClick}
          handleLogout={handleLogout}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
