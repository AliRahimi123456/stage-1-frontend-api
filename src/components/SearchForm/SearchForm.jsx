import React, { useState } from "react";
import "../../blocks/SearchForm.css";

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Enter Topic"
        name="name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-bar__btn">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
