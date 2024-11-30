import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTruck, FaUserShield, FaKey } from "react-icons/fa"; 
import "./StoreDetailPage.css";

// Import the SVG and PNG
import GetCodeSVG from "./image (1).svg";
import FreeSticker from "./image (1).png";

const StoreDetailPage = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/stores/id/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setStore(data.store);
        } else {
          setError(data.message || "Failed to fetch store details.");
        }
      } catch (error) {
        setError("An error occurred while fetching store details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  const handleGetCouponClick = (coupon) => {
    if (store?.url) {
      window.open(store.url, "_blank");
    }
    navigate(`/copy-coupon/${coupon.code}`, { state: { coupon, store } });
  };

  if (loading)
    return <p className="loading-message">Loading store details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="store-detail-page">
      {/* Main Content Section */}
      <div className="main-content">
        {/* Store Header Section */}
        <div className="store-header">
          <img className="free-sticker" src={FreeSticker} alt="Free Sticker" />
          <img
            className="store-logo"
            src={store.logo || "placeholder-image.jpg"}
            alt={store.name}
          />
          <div className="store-info">
            <div className="store-name-wrapper">
              <h1 className="store-name">
                <span className="highlighted-text">{store.name}</span>
              </h1>
              <div className="verified-badge">
                <FaCheckCircle />
                Verified
              </div>
            </div>
            <p className="store-description">{store.description}</p>
          </div>
        </div>

        {/* Coupons Section */}
        <div className="coupons-section">
          <ul className="coupons-list">
            {store.coupons.length > 0 ? (
              store.coupons.map((coupon) => (
                <li key={coupon.code} className="coupon-card">
                  <div className="coupon-card-left">
                    <span className="discount-tag">{coupon.discount}% OFF</span>
                  </div>
                  <div className="coupon-card-middle">
                    <span
                      className="highlighted-code"
                      onClick={() => handleGetCouponClick(coupon)}
                    >
                      Code
                    </span>
                    <p className="coupon-description">
                      {coupon.description || "No description provided."}
                    </p>
                    <span className="coupon-expiry">
                      Ends{" "}
                      {coupon.expiryDate
                        ? new Date(coupon.expiryDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="coupon-card-right">
                    <img
                      src={GetCodeSVG}
                      alt="Get Code"
                      className="get-code-svg"
                      onClick={() => handleGetCouponClick(coupon)}
                    />
                  </div>
                </li>
              ))
            ) : (
              <p>No coupons available for this store.</p>
            )}
          </ul>
        </div>
      </div>

      <aside className="sidebar">
        <h2>What discounts can we get from {store.name}?</h2>
        <ul className="discount-list">
          {store.freeShipping && (
            <li>
              <FaTruck className="icon" /> Free Shipping
            </li>
          )}
          {store.memberDiscount && (
            <li>
              <FaKey className="icon" /> Member Discount
            </li>
          )}
          {store.militaryDiscount && (
            <li>
              <FaUserShield className="icon" /> Military Discount
            </li>
          )}
        </ul>

        {store.promotionalInfo ? (
          <div className="promo-info">
            <h3>{store.name} Promotional Information</h3>
            <p>{store.promotionalInfo}</p>
          </div>
        ) : (
          <p>No promotional information available.</p>
        )}

        {store.pointsToKnow?.length > 0 ? (
          <div className="additional-info">
            <h3>Points you should know about {store.name}</h3>
            <ul className="points-list">
              {store.pointsToKnow.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No additional points to know.</p>
        )}
      </aside>
    </div>
  );
};

export default StoreDetailPage;
