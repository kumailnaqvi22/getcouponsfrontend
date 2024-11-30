import React from "react";
import { useLocation } from "react-router-dom";
import './CopyCoupon.css';

const CopyCoupon = () => {
  const location = useLocation();
  const { coupon, store } = location.state || {};

  // Function to copy the coupon code to the clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code).then(() => {
      alert("Coupon code copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy code: ", err);
    });
  };

  if (!coupon || !store) {
    return (
      <div className="error-message">
        <h1>Invalid Coupon or Store</h1>
        <p>Please try again.</p>
      </div>
    );
  }

  return (
    <div className="copy-coupon-container">
      <h1>Coupon for {store.name}</h1>
      <div className="coupon-details">
        <p className="coupon-discount">Discount: {coupon.discount}% Off</p>
        <p className="coupon-description">{coupon.description}</p>
        <p className="coupon-expiry">
          Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}
        </p>
        <p className="coupon-code">
          Code: <strong>{coupon.code}</strong>
          <button 
            className="copy-button" 
            onClick={handleCopyCode}
          >
            Copy Code
          </button>
        </p>
      </div>
      {/* <a
        href={`https://${store.domain}`}
        target="_blank"
        rel="noopener noreferrer"
        className="go-to-store-button"
      >
        Go to Store
      </a> */}
    </div>
  );
};

export default CopyCoupon;
