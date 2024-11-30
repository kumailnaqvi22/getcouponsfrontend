import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all stores from the API
    const fetchStores = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/stores`);
        const data = await response.json();
        if (response.ok) {
          setStores(data.stores);

          // Extract unique categories
          const uniqueCategories = [...new Set(data.stores.map((store) => store.category))];
          setCategories(uniqueCategories);
        } else {
          console.error("Failed to fetch stores:", data.message);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  // Filter stores by selected category
  const filteredStores = selectedCategory
    ? stores.filter((store) => store.category === selectedCategory)
    : stores;

  // Navigate to the store detail page
  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="categories-page">
      <h1>Categories</h1>

      {/* Render categories */}
      <div className="categories-list">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-button ${selectedCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
        <button onClick={() => setSelectedCategory(null)}>Show All</button>
      </div>

      {/* Render stores */}
      {selectedCategory && <h2>Stores in {selectedCategory}</h2>}
      <div className="stores-list">
        {filteredStores.map((store) => (
          <div
            key={store._id}
            className="store-card"
            onClick={() => handleStoreClick(store._id)}
          >
            <img src={store.logo} alt={store.name} />
            <h3>{store.name}</h3>
            <p>{store.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
