import React, { useState } from "react";
import './CouponForm.css'; 


const CouponForm = ({ coupon, onClose }) => {
  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    description: coupon?.description || "",
    expiryDate: coupon?.expiryDate || "",
    discount: coupon?.discount || "",
    store: coupon?.store || "",
    terms: coupon?.terms || "",
    category: coupon?.category || "",
    status: coupon?.status || "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = coupon ? "PUT" : "POST";
    const url = coupon
      ? `${process.env.REACT_APP_API_BASE_URL}/api/coupons/${coupon._id}`
      : `${process.env.REACT_APP_API_BASE_URL}/api/coupons`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to save coupon");
      }
    } catch (error) {
      console.error("Error saving coupon:", error);
    }
  };

  return (
    <div className="coupon-form">
      <h2>{coupon ? "Edit Coupon" : "Add New Coupon"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Coupon Code"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount (%)"
        />
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          placeholder="Expiry Date"
        />
        <input
          type="text"
          name="store"
          value={formData.store}
          onChange={handleChange}
          placeholder="Store"
        />
        <input
          type="text"
          name="terms"
          value={formData.terms}
          onChange={handleChange}
          placeholder="Terms and Conditions"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
