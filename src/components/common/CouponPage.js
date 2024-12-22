import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CouponPage.css";

const CouponPage = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/stores`
        );
        const data = await response.json();

        if (response.ok && Array.isArray(data.stores)) {
          setStores(data.stores);
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

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="coupon-page-unique">
      <h1>Top Stores in {currentMonth} {new Date().getFullYear()}</h1>
      <div className="stores-list-unique">
        {stores.length === 0 ? (
          <p>Stores Loading...</p>
        ) : (
          stores.map((store) => (
            <div
              key={store._id}
              className="store-card-unique"
              onClick={() => handleStoreClick(store._id)}
            >
              <img
                src={store.logo}
                alt={store.name}
                className="store-logo-unique"
              />
              <h3 className="store-name-unique">{store.name}</h3>
              <p className="coupon-count-unique">
                <span className="coupon-number-unique">
                  {store.coupons?.length || 0}
                </span>{" "}
                {store.coupons?.length === 1 ? "Coupon" : "Coupons"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouponPage;