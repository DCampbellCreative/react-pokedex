import React from "react";

export const Search = (props) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          onChange={(e) => props.updateFilter(e.target.value.toLowerCase())}
        />
      </div>
    </div>
  );
};
