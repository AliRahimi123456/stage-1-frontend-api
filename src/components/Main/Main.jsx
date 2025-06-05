import NewsCards from "../NewsCards/NewsCards";
import About from "../About/About";
import SearchForm from "../SearchForm/SearchForm";
function Main({ cards, onCardClick, handleCardSave, showSearchResult }) {
  return (
    <>
      {/* <SearchForm onSearch={onSearch} /> */}
      {showSearchResult && (
        <NewsCards
          cards={cards}
          onCardClick={onCardClick}
          handleCardSave={handleCardSave}
        />
      )}
      <About />
    </>
  );
}

export default Main;
