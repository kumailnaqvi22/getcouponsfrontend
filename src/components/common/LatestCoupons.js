import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./LatestCoupons.css";

const LatestCoupons = () => {
  const [featuredCoupons, setFeaturedCoupons] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/stores`
        );
        const data = await response.json();

        if (response.ok && Array.isArray(data.stores)) {
          const allCoupons = data.stores.flatMap((store) =>
            store.coupons.map((coupon) => ({
              ...coupon,
              storeName: store.name,
              storeLogo: store.logo,
              storeUrl: store.url,
            }))
          );

          const filteredCoupons = allCoupons.filter(
            (coupon) => coupon.isFeatured
          );

          setFeaturedCoupons(filteredCoupons);
        } else {
          console.error("Failed to fetch stores:", data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

 const handleGetCouponClick = (coupon) => {
  navigate(`/copy-coupon/${coupon.code}`, {
    state: { 
      coupon,
      store: {
        name: coupon.storeName,
        logo: coupon.storeLogo,
        url: coupon.storeUrl,
      },
    },
  });
};


  return (
    <div className="latest-coupons-container">
      <h1 className="latest-promo-heading">Latest Promo Code</h1>
      {featuredCoupons.length === 0 ? (
        <p>Loading Featured Coupons...</p>
      ) : (
        <div className="featured-coupons-grid">
          {featuredCoupons.map((coupon) => (
            <div key={coupon._id} className="featured-coupon-card">
              <div className="logo-container">
                <img
                  src={coupon.storeLogo}
                  alt={coupon.storeName}
                  className="featured-store-logo"
                />
              </div>
              <hr className="coupon-divider" />
              <div className="coupon-content">
                <h2 className="featured-coupon-discount">{coupon.discount}% off</h2>
                <p className="featured-coupon-description">{coupon.description}</p>
                <a href="#" className="coupon-code-link">
                  Code
                </a>
              </div>
              <div
                className="featured-code-hover"
                onClick={() => handleGetCouponClick(coupon)}
              >
                <span>Get Code</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCoupons;
