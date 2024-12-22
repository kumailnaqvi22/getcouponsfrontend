import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa"; // Icons
import "./TrendingStores.css"; // Import CSS file

const TrendingStores = () => {
  const [trendingStores, setTrendingStores] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Initially closed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingStores = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/stores`
        );
        const data = await response.json();

        if (response.ok) {
          const trending = data.stores.filter((store) => store.isTrending);
          setTrendingStores(trending);
        } else {
          setError(data.message || "Failed to fetch trending stores");
        }
      } catch (error) {
        setError("Error fetching trending stores");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingStores();
  }, []);

  return (
    <div className="trending-stores-container">
      <div className="header" onClick={() => setIsOpen(!isOpen)}>
        <div className="header-content">
          <FaStar className="icon" /> {/* Header Icon */}
          <h2>Popular Stores</h2>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="store-list">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            trendingStores.map((store) => (
              <div className="store-item" key={store._id}>
                <img src={store.logo} alt={store.name} className="store-logo" />
                <span>{store.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingStores;
