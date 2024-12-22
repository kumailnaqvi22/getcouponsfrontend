import React, { useState, useEffect } from "react";
import "./Home.css";
import { FiSearch } from "react-icons/fi";
import CouponPage from "./CouponPage";
import HeroSuggestions from "./heroSuggestion";
import HomeAbout from "./HomeAbout";
import TrendingCoupons from "../common/TrendingCoupons"; 
import LatestCoupons from "../common/LatestCoupons"; 
import TrendingStores from "../common/TrendingStores"; 
import StoreCollection from "../common/StoreCollection"; 

const Home = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Fetch store data
    const fetchStores = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/stores`);
        const data = await response.json();
        if (response.ok) {
          setStores(data.stores);
        } else {
          console.error("Failed to fetch stores:", data.message);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 2) {
      const results = stores.filter((store) =>
        Object.values(store)
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredStores(results);
      setShowSuggestions(true);
    } else {
      setFilteredStores([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (storeId) => {
    setSearchTerm("");
    setShowSuggestions(false);
    // Navigate or handle store selection
    console.log(`Selected store ID: ${storeId}`);
  };

  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <div className="text-section">
            <h1>THE BEST COUPONS and DISCOUNTS ONLINE</h1>
          </div>
          <div className="search-section">
            <div className="search-bar2">
              <input
                type="text"
                className="search-input"
                placeholder="Search Your Brands Here"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm.length > 2 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Small delay for click handling
              />
              <button className="search-button">
                <FiSearch className="search-icon" />
              </button>
            </div>
            {showSuggestions && (
              <HeroSuggestions
                stores={filteredStores}
                onClick={handleSuggestionClick}
              />
            )}
          </div>
        </div>
        <div className="image-section">
          <img
            src="https://i.ibb.co/f8VxwWz/image.png"
            alt="Right Side"
            className="sale-image"
          />
        </div>
      </div>
      {/* Add TrendingCoupons here */}
      <TrendingCoupons />
      <CouponPage />
      <LatestCoupons />
      <TrendingStores />
      <StoreCollection />
      <HomeAbout />
    </>
  );
};

export default Home;
