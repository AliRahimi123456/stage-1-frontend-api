import NewsCards from "../NewsCards/NewsCards";
import About from "../About/About";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Emoji from "../../assets/not-found-mo-icon.svg";

function Main({
  cards,
  onCardClick,
  handleCardSave,
  showSearchResult,
  isLoading,
}) {
  return (
    <>
      {/* Show Preloader if loading */}
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {showSearchResult && (
            <>
              {cards.length > 0 ? (
                <NewsCards
                  cards={cards}
                  onCardClick={onCardClick}
                  handleCardSave={handleCardSave}
                />
              ) : (
                <div className="no-result-message">
                  <img
                    className="no-result-message__emoji"
                    src={Emoji}
                    alt="Emoji"
                  />
                  <h2 className="no-result-message__title">Nothing Found!</h2>
                  <p className="no-result-message__paragraph">
                    Sorry, but nothing matched your search terms
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
      <About />
    </>
  );
}

export default Main;
