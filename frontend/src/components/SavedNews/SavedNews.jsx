import { useContext } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "../../blocks/SavedNews.css";
import CurrentUserContext from "../../utils/context/CurrentUser";

function SavedNews({
  savedCards,
  handleCardDelete,
  handleCardClick,
  handleCardSave,
}) {
  const contextValue = useContext(CurrentUserContext);
  const { currentUser } = contextValue;

  const getSortedUniqueKeywords = (keywords) => {
    const counts = {};
    keywords.forEach((keyword) => {
      counts[keyword] = (counts[keyword] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);
  };

  const keywords = savedCards.map((card) => card.keyword);
  const sortedKeywords = getSortedUniqueKeywords(keywords);

  const renderKeywordsText = () => {
    const count = sortedKeywords.length;
    if (count === 0) return "none";
    if (count === 1) return sortedKeywords[0];
    if (count === 2) return `${sortedKeywords[0]} and ${sortedKeywords[1]}`;
    return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${
      count - 2
    } others`;
  };
  console.log(currentUser);

  return (
    <section className="saved-news">
      <div className="saved-news__title-container">
        <h2 className="saved-news__title">Saved articles</h2>
        <p className="saved-news__articles">
          {currentUser?.name}, you have {savedCards.length} saved articles
        </p>
        <p className="saved-news__keywords">
          Keywords:{" "}
          <span className="saved-news__keyword">{renderKeywordsText()}</span>
        </p>
      </div>
      <div className="saved-news__container">
        <ul className="saved-news__list">
          {savedCards.map((card) => (
            <NewsCard
              key={card.url}
              item={card}
              onCardClick={handleCardClick}
              handleCardSave={handleCardSave}
              handleCardDelete={handleCardDelete}
              savedCards={savedCards}
            />
            // </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SavedNews;
