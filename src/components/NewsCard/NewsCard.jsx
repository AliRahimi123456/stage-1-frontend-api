import { useContext } from "react";
import { CurrentUserContext } from "../../utils/context/CurrentUser";
import "../../blocks/NewsCard.css";

function NewsCard({ item, onCardClick, handleCardSave }) {
  const currentUser = useContext(CurrentUserContext);

  // const handleCardClick = () => {
  //   onCardClick(item);
  // };

  // function isLiked(value, array) {
  //   return Array.isArray(array) && array.includes(value);
  // }
  const handleSaveClick = () => {
    handleCardSave(item);
  };
  //

  // const toggleLike = () => {
  //   handleCardLike({
  //     _id: item._id,
  //     isLiked: isLiked(currentUser?._id, item.likes),
  //   });
  // };

  const publishedDate = new Date(item.publishedAt);
  const formattedDate = publishedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  return (
    <li className="newscard">
      <div className="newscard__save-container">
        {/* {currentUser && (
          // <button onClick={handleSaveClick} className="newscard__save-button">
          //   Save
          // </button>
        )} */}
      </div>
      <img className="newscard__image" src={item.urlToImage} alt={item.name} />

      <button className="newscard__save-btn" onClick={handleSaveClick}></button>

      <div className="newscard__container">
        <time className="newscard__date" dateTime={publishedDate.toISOString()}>
          {formattedDate}
        </time>
        <h2 className="newscard__title">{item.title}</h2>
        <p className="newscard__description">{item.description}</p>
      </div>
    </li>
  );
}

export default NewsCard;
