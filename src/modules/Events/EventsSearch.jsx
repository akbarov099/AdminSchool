import React, { useState } from "react";
import useDarkModeStore from "../../Store/DarcModeStore";
import { IoMdSearch } from "react-icons/io";

export default function EventsSearch({ onSearch }) {
  const { darkMode } = useDarkModeStore();
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <section>
      <div className="container">
        <div className={`${darkMode ? "search__wrapper-light" : "search__wrapper-dark"}`}>
          <div className="search">
            <input 
              type="text" 
              value={query} 
              onChange={handleSearchChange} 
              placeholder="Имя или предмет..." 
            />
            <button onClick={() => onSearch(query)}>Поиск</button>
            <IoMdSearch className="search__icon" />
          </div>
        </div>
      </div>
    </section>
  );
}
