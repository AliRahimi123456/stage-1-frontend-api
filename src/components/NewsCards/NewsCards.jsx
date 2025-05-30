import { useState } from "react";
import "../../blocks/NewsCards.css";
// import { useContext } from "react";
// import { CurrentUserContext } from "../../context/CurrentUser";
import NewsCard from "../NewsCard/NewsCard";
// import { defaultClothingItems } from "../../utils/constants";

function NewsCards({ cards, handleCardClick, onAddNewClick, handleCardSave }) {
  //   const currentUser = useContext(CurrentUserContext);
  // console.log(clothingItems);
  // console.log(currentUser);
  const [visibleCount, setVisiableCount] = useState(3);

  const handleShowMore = () => {
    setVisiableCount((prev) => prev + 3);
  };

  return (
    <div className="newscards-section">
      <div className="newscards-section__header">
        <p className="newscards-section__title newscards__search-title">
          Search results
        </p>
        {/* <button
          className="newscards-section__add-btn"
          onClick={onAddNewClick}
        ></button> */}
      </div>
      <ul className="newscards-section__items">
        {
          // compare item.owner to currentUser._id
          //   .filter((item) => item.owner === currentUser?._id)
          // .filter((item) => item.weather === weatherData?.type)

          // TODO create and show more button which when you are clicking it shows more articles
          cards.slice(0, visibleCount)?.map((item) => (
            <NewsCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              handleCardSave={handleCardSave}
            />
          ))
        }
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
