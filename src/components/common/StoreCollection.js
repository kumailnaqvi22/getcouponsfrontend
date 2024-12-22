import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaStore } from "react-icons/fa"; // Added FaStore icon
import "./StoreCollection.css"; // Custom CSS

const StoreCollection = () => {
  const [stores, setStores] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Initially closed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/stores`
        );
        const data = await response.json();

        if (response.ok) {
          const trendingStores = data.stores.filter((store) => store.isTrending);
          setStores(trendingStores);
        } else {
          setError("Failed to fetch stores");
        }
      } catch (error) {
        setError("Error fetching stores");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div className="store-collection-container">
      <div className="header" onClick={() => setIsOpen(!isOpen)}>
        <div className="header-content">
          <FaStore className="store-icon" /> {/* Icon added here */}
          <h2>Latest Collection of Stores</h2>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="store-grid">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            stores.map((store) => (
              <div key={store._id} className="store-item">
                <span>{store.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StoreCollection;
