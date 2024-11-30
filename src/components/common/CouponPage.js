// CouponPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CouponPage.css";

const CouponPage = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all stores from the backend
    const fetchStores = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/stores`
        );
        const data = await response.json();

        if (response.ok) {
          // Ensure the response contains a stores array
          if (Array.isArray(data.stores)) {
            setStores(data.stores);
          } else {
            console.error("Stores data is not an array:", data.stores);
          }
        } else {
          console.error("Failed to fetch stores:", data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="coupon-page">
      <h1>Top Stores in {currentMonth} {new Date().getFullYear()}</h1>

      <div className="stores-list">
        {stores.length === 0 ? (
          <p>No stores available.</p>
        ) : (
          stores.map((store) => (
            <div
              key={store._id}
              className="store-card"
              onClick={() => handleStoreClick(store._id)}
            >
              <div className="store-card-inner">
                <img src={store.logo} alt={store.name} className="store-logo" />
                <div className="hover-overlay">
                  <span>Show More</span>
                </div>
              </div>
              <h3>{store.name}</h3>
              <p>
                {store.coupons?.length > 0
                  ? `${store.coupons.length} ${store.coupons.length > 1 ? 'Coupons' : 'Coupon'}`
                  : 'No Coupons'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouponPage;