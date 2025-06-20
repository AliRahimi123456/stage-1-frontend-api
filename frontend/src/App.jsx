import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";

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
  getArticles,
} from "./utils/api";
import CurrentUserContext from "./utils/context/CurrentUser";
import RegisterSuccessModal from "./components/RegisterSuccessModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [cards, setCards] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUser(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getArticles(token).then((res) => {
        setSavedCards(res.data);
      });
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

    card.isSaved = !card.isSaved;
    if (card.isSaved) {
      console.log("Adding card to savedCards:", card);
      saveArticle(card, localStorage.getItem("jwt")).then((newArticle) => {
        setSavedCards([...savedCards, newArticle.data]);
      });
    } else {
      setSavedCards((prevSavedCards) =>
        prevSavedCards.filter(
          (savedCard) => savedCard.urlToImage !== card.urlToImage
        )
      );
    }

    // if you can uncheck it then you must account for that in your "Saced articles"

    setTimeout(() => {
      console.log("savedCards after timeout:", savedCards);
    }, 2000);
    // }
  };

  const handleCardDelete = (cardToDelete) => {
    console.log("Deleting card:", cardToDelete);
    deleteArticle(cardToDelete._id, localStorage.getItem("jwt"))
      .then(() => {
        setSavedCards((prevSavedCards) =>
          prevSavedCards.filter(
            (card) => card.urlToImage !== cardToDelete.urlToImage
          )
        );
        // set issaved to false if we delete a card.
        // we are doing this for your current setup, you might need to just clear your cards when navigating back to the home screen.
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.urlToImage === cardToDelete.urlToImage
              ? {
                  ...card,
                  isSaved: false,
                }
              : card
          )
        );
      })
      .catch((err) => {
        console.error("Failed to delete article:", err);
      });
  };

  const handleSearchSubmit = (searchTerm) => {
    setIsLoading(true);
    setKeyword(searchTerm);
    getNewsArticles(searchTerm)
      .then((data) => {
        const articles = data.articles.map((article) => ({
          ...article,
          isSaved: false,
          keyword: searchTerm,
        }));
        setCards(articles);
        setShowSearchResult(true);
        // setTimeout(() => {
        // just to simulate a longer ressponse so we can develope the prelaoder
        setIsLoading(false);
        // }, 2000);
      })
      .catch((error) => console.error("Error fetching news articles:", error));
  };

  const onLoginClick = () => {
    setActiveModal("login-modal");
    handleCloseMenu();
  };

  const onSignUpClick = () => {
    setActiveModal("register-modal");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogin = (credentials) =>
    loginUser(credentials)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          checkToken(res.token).then((res2) => {
            console.log(res2);
            setUser(res2.data);
            setActiveModal("");
          });
        }
      })
      .catch((err) => console.error("Login failed:", err));

  const handleRegister = (userData) => {
    registerUser(userData)
      .then((res) => {
        if (res.email) {
          handleLogin({
            email: userData.email,
            password: userData.password,
          }).then(() => {
            setActiveModal("register-success-modal");
          });
        }
      })
      .catch((err) => console.error("Error during registration:", err));
  };
  console.log(activeModal);

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
    <CurrentUserContext.Provider value={{ currentUser: user, isLoggedIn }}>
      <div className="page">
        <Header
          onLoginClick={onLoginClick}
          handleLogin={handleLogin}
          currentUser={user}
          handleLogout={handleLogout}
          onSearch={handleSearchSubmit}
          handleMenuBtnClick={handleMenuBtnClick}
          isOpen={activeModal !== ""}
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
                isLoading={isLoading}
                savedCards={savedCards}
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
          onLogInClick={onLoginClick}
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
          onSignInClick={onLoginClick}
          handleLogout={handleLogout}
        />
        <RegisterSuccessModal
          isOpen={activeModal === "register-success-modal"}
          onClose={closeActiveModal}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
