import React from "react";
import "../../styles/Suggestions.css";

const Suggestions = ({ stores, onClick }) => {
  return (
    <div className="suggestions-overlay">
      {stores.length > 0 ? (
        <ul className="suggestions-list">
          {stores.map((store) => (
            <li
              key={store._id}
              className="suggestion-item"
              onClick={() => onClick(store._id)}
            >
              <strong>{store.name}</strong>
              <p>{store.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">No matching stores found.</div>
      )}
    </div>
  );
};

export default Suggestions;
