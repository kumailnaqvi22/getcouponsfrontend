import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingCoupons.css";

const TrendingCoupons = () => {
  const [trendingStores, setTrendingStores] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch trending stores from the backend
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

  useEffect(() => {
    // Determine the slide interval based on screen size
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + (window.innerWidth < 768 ? 1 : 3)) % trendingStores.length
      );
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [trendingStores]);

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`); // Navigate to the same route as in CouponPage
  };

  if (loading) {
    return <div className="loading-indicator">Loading trending stores...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Determine how many cards to show based on screen size
  const slidesToShow = window.innerWidth < 768 ? 1 : 3;

  // Get the current set of stores to display
  const displayedStores = trendingStores.slice(
    currentIndex,
    currentIndex + slidesToShow
  );

  if (displayedStores.length < slidesToShow) {
    // Append additional stores from the start to complete the slide
    const additionalStores = trendingStores.slice(
      0,
      slidesToShow - displayedStores.length
    );
    displayedStores.push(...additionalStores);
  }

  return (
    <div className="trending-coupons">
      <h2>Shop Today's Trending Coupons at Coupons Worth</h2>
      <div className="trending-slider">
        {displayedStores.map((store, index) => (
          <div
            key={index}
            className="trending-card"
            onClick={() => handleStoreClick(store._id)} // Use store._id for internal navigation
            aria-label={`View coupons for ${store.name}`}
          >
            {/* Background image */}
            <div
              className="card-background"
              style={{
                backgroundImage: `url(${store.logo || "/default-bg.jpg"})`,
              }}
            >
              {/* Sub-card with logo and description */}
              <div className="sub-card">
                <img
                  src={store.logo || "/default-logo.png"}
                  alt={`${store.name} logo`}
                  className="store-logo"
                />
                <div className="store-info">
                  <h3>{store.name}</h3>
                  <p>{store.description || "Find the best deals and offers!"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoupons;
