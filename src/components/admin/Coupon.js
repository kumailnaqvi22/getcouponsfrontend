import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Coupon.css";

const Coupon = () => {
  const [prefix, setPrefix] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiration, setExpiration] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/coupons`);
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const generateRandomCode = (prefix) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return `${prefix}${randomNumber}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = generateRandomCode(prefix);
    setGeneratedCode(code);

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/coupons`, {
        code,
        discount,
        expiryDate: expiration,
      });
      setLoading(false);
      setCoupons([...coupons, response.data]);
      setPrefix("");
      setDiscount("");
      setExpiration("");
    } catch (error) {
      setLoading(false);
      console.error("Error generating coupon:", error);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Coupon code copied to clipboard!");
    });
  };

  return (
    <div className="coupon">
      <h2>Generate Coupon</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Prefix:
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            required
          />
        </label>
        <label>
          Discount (%):
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="date"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Coupon"}
        </button>
      </form>
      {generatedCode && (
        <div className="generated-code">
          <h3>Generated Coupon Code</h3>
          <p onClick={() => copyToClipboard(generatedCode)}>{generatedCode}</p>
        </div>
      )}
      <div className="coupon-list">
        <h3>Existing Coupons</h3>
        <ul>
          {coupons.map((coupon) => (
            <li key={coupon._id}>
              {coupon.code} - {coupon.discount}% - Expires on {new Date(coupon.expiryDate).toLocaleDateString()}
              <button onClick={() => copyToClipboard(coupon.code)}>Copy</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Coupon;