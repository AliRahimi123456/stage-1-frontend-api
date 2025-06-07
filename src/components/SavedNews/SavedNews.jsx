import NewsCard from "../NewsCard/NewsCard";
import "../../blocks/SavedNews.css";
import { CurrentUserContext } from "../../utils/context/CurrentUser";
import { useContext } from "react";

function SavedNews({
  savedCards,
  handleCardDelete,
  handleCardClick,
  handleCardSave,
}) {
  const currentUser = useContext(CurrentUserContext);

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

  return (
    <section className="saved-news">
      <div className="saved-news__title-container">
        <h2 className="saved-news__title">Saved articles</h2>
        <h1 className="saved-news__articles">
          {currentUser?.name}, you have {savedCards.length} saved articles
        </h1>
        <h2 className="saved-news__keywords">
          Keywords:{" "}
          <span className="saved-news-keyword">{renderKeywordsText()}</span>
        </h2>
      </div>
      <div className="saved-news__container">
        <ul className="saved-news__list">
          {savedCards.map((card) => (
            <li key={card.url} className="saved-news__item">
              <NewsCard
                item={card}
                onCardClick={handleCardClick}
                handleCardSave={handleCardSave}
                handleCardDelete={handleCardDelete}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SavedNews;
