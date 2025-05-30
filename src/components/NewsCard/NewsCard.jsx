import { useContext } from "react";
import { CurrentUserContext } from "../../utils/context/CurrentUser";
import "../../blocks/NewsCard.css";
import { useLocation } from "react-router-dom";

function NewsCard({ item, onCardClick, handleCardSave, handleCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const handleSaveClick = () => {
    handleCardSave(item);
  };
  console.log(item);
  const publishedDate = new Date(item.publishedAt);
  const formattedDate = publishedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  const isHome = location.pathname === "/";

  return (
    <li className="newscard">
      <div className="newscard__save-container"></div>
      <img className="newscard__image" src={item.urlToImage} alt={item.name} />
      {location.pathname === "/saved-news" && (
        <div className="newscard__keyword">{item.keyword}</div>
      )}
      <button
        className={`newscard__save-btn ${
          location.pathname === "/saved-news" ? "newscard__save-btn_trash" : ""
        }`}
        onClick={isHome ? handleSaveClick : () => handleCardDelete(item)}
      ></button>

      <div className="newscard__container">
        <time className="newscard__date" dateTime={publishedDate.toISOString()}>
          {formattedDate}
        </time>
        <h2 className="newscard__title">{item.title}</h2>
        <p className="newscard__description">{item.description}</p>
        <p className="newscard__source">{item.source.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
