import { useContext } from "react";
import { useLocation } from "react-router-dom";
import CurrentUserContext from "../../utils/context/CurrentUser";
import "../../blocks/NewsCard.css";

function NewsCard({ item, handleCardSave, handleCardDelete, savedCards }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  // const [isSaved, setIsSaved] = useState(false);
  const handleSaveClick = () => {
    handleCardSave(item);
    // setIsSaved(true);
  };
  const publishedDate = new Date(item.publishedAt || item.createdAt);
  const formattedDate = publishedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  const isSaved = savedCards.some((c) => {
    if (c.url === item.url) {
      console.log("This one is saved:", item.url, c);
    }
    return c.url === item.url;
  });
  console.log({ isSaved, item, savedCards });

  const isHome = location.pathname === "/";
  return (
    <li className="newscard">
      {/* <div className="newscard__save-container"></div> */}
      <img className="newscard__image" src={item.urlToImage} alt={item.name} />
      {location.pathname === "/saved-news" && (
        <div className="newscard__keyword">{item.keyword}</div>
      )}
      <div className="newscard__btn-container">
        {!currentUser && isHome && (
          <div className="newscard__text">Sign in to save articles</div>
        )}

        {!isHome && <div className="newscard__text">Remove from saved</div>}
        <button
          className={`newscard__save-btn ${
            location.pathname === "/saved-news"
              ? "newscard__save-btn_trash newscard__save-btn_color_black"
              : "newscard__save-btn_home"
          } ${
            location.pathname !== "/saved-news" && isSaved
              ? "newscard__save-btn_saved"
              : ""
          }`}
          onClick={isHome ? handleSaveClick : () => handleCardDelete(item)}
        ></button>
      </div>

      <div className="newscard__container">
        <time className="newscard__date" dateTime={publishedDate.toISOString()}>
          {formattedDate}
        </time>
        <h2 className="newscard__title">{item.title}</h2>
        <p className="newscard__description">{item.content}</p>
        <p className="newscard__source">{item.source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
