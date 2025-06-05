import { useState } from "react";
import "../../blocks/NewsCards.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCards({ cards, handleCardClick, onAddNewClick, handleCardSave }) {
  const [visibleCount, setVisiableCount] = useState(3);

  const handleShowMore = () => {
    setVisiableCount((prev) => prev + 3);
  };

  return (
    <div className="newscards">
      <div className="newscards__header">
        <p className="newscards__title newscards__title_type_search">
          Search results
        </p>
      </div>
      <ul className="newscards__list">
        {cards.slice(0, visibleCount)?.map((item) => (
          <NewsCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            handleCardSave={handleCardSave}
          />
        ))}
      </ul>

      {visibleCount < cards.length && (
        <button
          className="newsCards-section newscards__show-more-cards-btn"
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}
    </div>
  );
}

export default NewsCards;
