import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetCodeSVG from "./image (1).svg"; // Reuse the SVG
import "./StoreDetailPage.css";
import "./little.css";

const HeaderCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [displayedCoupons, setDisplayedCoupons] = useState([]); // Coupons that are currently displayed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedCount, setLoadedCount] = useState(50); // Initial load of 50 coupons
  const navigate = useNavigate();

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
              storeId: store.id, // Ensure storeId is set here
            }))
          );
          setCoupons(allCoupons); // Save all coupons in state
          setDisplayedCoupons(allCoupons.slice(0, loadedCount)); // Display only the first 50 coupons
        } else {
          setError(data.message || "Failed to fetch stores.");
        }
      } catch (error) {
        setError("An error occurred while fetching stores.");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Function to handle loading more coupons
  const loadMoreCoupons = () => {
    const newLoadedCount = loadedCount + 50;
    setLoadedCount(newLoadedCount); // Increase the loaded count by 50
    setDisplayedCoupons(coupons.slice(0, newLoadedCount)); // Display the new set of coupons
  };

  const handleGetCouponClick = (coupon) => {
    if (coupon.storeUrl) {
      window.open(coupon.storeUrl, "_blank");
    }
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

  if (loading) return <p>Loading coupons...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="coupons-section">
      <div
        className="coupons-header"
        style={{
          width: "80%",
          margin: "0 auto 20px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h1>Latest Verified Coupons - Couponsworth</h1>
        <p>
          Discover the best new coupons on this page, featuring discounts from
          top merchants like Amazon, Walmart, Target, and Best Buy. Easily
          browse and find savings on electronics, apparel, groceries, and more.
        </p>
      </div>

      <ul className="coupons-list">
        {displayedCoupons.length > 0 ? (
          displayedCoupons.map((coupon) => (
            <li
              key={coupon.code}
              className="coupon-card"
              style={{
                width: "80%",
                margin: "10px auto",
                boxSizing: "border-box",
              }}
            >
              <div className="coupon-card-left">
                <span className="discount-tag">{coupon.discount}% OFF</span>
                <img
                  src={coupon.storeLogo}
                  alt={`${coupon.storeName} Logo`}
                  className="store-logo"
                />
              </div>

              <div className="coupon-card-middle">
                <span
                  className="highlighted-code"
                  onClick={() => handleGetCouponClick(coupon)}
                >
                  {coupon.code || "Code"}
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
          <p>No coupons available at the moment.</p>
        )}
      </ul>

      {displayedCoupons.length < coupons.length && (
        <div className="see-more-button">
          <button onClick={loadMoreCoupons}>See More</button>
        </div>
      )}
    </div>
  );
};

export default HeaderCoupons;
