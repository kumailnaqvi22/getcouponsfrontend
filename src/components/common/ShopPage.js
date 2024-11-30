import React, { useEffect, useState } from "react";
import './ShopPage.css';
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("all");
  const [visibleStores, setVisibleStores] = useState({});

  const MAX_VISIBLE = 5;
  const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/stores`);
        const data = await response.json();
        if (response.ok && data.stores) {
          setStores(data.stores);
          setFilteredStores(data.stores);
        } else {
          console.error("Failed to fetch stores:", data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    const filtered = letter === "all"
      ? stores
      : stores.filter(store => store.name && store.name[0].toUpperCase() === letter);
    setFilteredStores(filtered);
  };

  const organizeStores = () => {
    const groupedStores = {};
    filteredStores.forEach(store => {
      if (store.name) {
        const firstLetter = store.name[0].toUpperCase();
        if (!groupedStores[firstLetter]) groupedStores[firstLetter] = [];
        groupedStores[firstLetter].push(store);
      }
    });
    return groupedStores;
  };

  const handleStoreClick = (store) => {
    navigate(`/store/${store._id}`);
  };
  

  const toggleVisibility = (letter) => {
    setVisibleStores((prevVisible) => ({
      ...prevVisible,
      [letter]: !prevVisible[letter],
    }));
  };

  const groupedStores = organizeStores();

  return (
    <div className="shop-page">
      <h1>All Stores</h1>

      <div className="alphabet-filter">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`filter-button ${selectedLetter === letter ? "active" : ""}`}
          >
            {letter}
          </button>
        ))}
        <button
          onClick={() => handleLetterClick("all")}
          className={`filter-button ${selectedLetter === "all" ? "active" : ""}`}
        >
          All
        </button>
      </div>

      <div className="stores-list">
        {Object.keys(groupedStores).sort().map((letter) => (
          <div key={letter} className="store-group">
            <h2>{letter}</h2>
            {groupedStores[letter].slice(0, visibleStores[letter] ? undefined : MAX_VISIBLE).map((store) => (
              <div
                key={store._id}
                className="store-card"
                onClick={() => handleStoreClick(store)}
              >
                <div className="store-info">
                  <h3 className="store-name">{store.name}</h3>
                </div>
              </div>
            ))}
            {groupedStores[letter].length > MAX_VISIBLE && (
              <button
                onClick={() => toggleVisibility(letter)}
                className="see-more-button"
              >
                {visibleStores[letter] ? "See Less" : "See More"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
