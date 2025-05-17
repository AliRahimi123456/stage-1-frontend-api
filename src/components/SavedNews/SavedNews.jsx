function SavedNews({
  savedCards,
  handleCardDelete,
  handleCardClick,
  handleCardSave,
}) {
  return (
    <section className="saved-news">
      <h2 className="saved__news-title">Saved articles</h2>
      <ul className="saved__news-list">
        {savedCards.length > 0 ? (
          savedCards.map((card) => (
            <li key={card.url} className="saved__news-item">
              <NewsCard
                item={card}
                onCardClick={handleCardClick}
                handleCardSave={handleCardSave}
              />
              <button onClick={() => handleCardDelete(card.id || card._id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No saved articles.</p>
        )}
      </ul>
    </section>
  );
}

export default SavedNews;
