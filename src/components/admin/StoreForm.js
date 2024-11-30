import React, { useState } from "react";
import "./StoreForm.css";

const StoreForm = ({ store, onClose }) => {
  const isEditMode = Boolean(store); // Check if in edit mode

  const [formData, setFormData] = useState({
    name: store?.name || "",
    logo: store?.logo || "",
    url: store?.url || "",
    subdomain: store?.subdomain || "", // New field for subdomain
    description: store?.description || "",
    category: store?.category || "",
    tags: store?.tags?.join(", ") || "",
    status: store?.status || "Active",
    coupons: store?.coupons || [],
    promotionalInfo: store?.promotionalInfo || "", // New field
    pointsToKnow: store?.pointsToKnow?.join(", ") || "", // New field (comma-separated)
    freeShipping: store?.freeShipping || false, // New field
    memberDiscount: store?.memberDiscount || false, // New field
    militaryDiscount: store?.militaryDiscount || false, // New field
    isTrending: store?.isTrending || false,
  });

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    discount: "",
    discountType: "",
    expiryDate: "",
    terms: "",
    isVerified: false,
    isFeatured: false,
  });

  // Handle general form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle coupon field changes
  const handleCouponChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCoupon((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add a new coupon
  const addCoupon = () => {
    if (
      !isEditMode &&
      (!newCoupon.code || !newCoupon.discount || !newCoupon.discountType)
    ) {
      alert("Please fill in all required fields for the coupon.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      coupons: [...prev.coupons, { ...newCoupon }],
    }));

    setNewCoupon({
      code: "",
      description: "",
      discount: "",
      discountType: "",
      expiryDate: "",
      terms: "",
      isVerified: false,
      isFeatured: false,
    });
  };

  // Remove a coupon
  const removeCoupon = (index) => {
    setFormData((prev) => ({
      ...prev,
      coupons: prev.coupons.filter((_, i) => i !== index),
    }));
  };

  // const checkSubdomainAvailability = async (subdomain) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_BASE_URL}/api/stores/check-subdomain?subdomain=${subdomain}`
  //     );
  //     const data = await response.json();
  //     if (data.available) {
  //       alert("Subdomain is available!");
  //     } else {
  //       alert("Subdomain is already taken. Please choose another one.");
  //     }
  //   } catch (error) {
  //     console.error("Error checking subdomain:", error);
  //     alert("Unable to verify subdomain availability.");
  //   }
  // };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation for required fields
  if (!formData.name || !formData.url) {
    alert("Name and URL are required.");
    return;
  }

  // Filter out incomplete coupons in create mode
  const filteredCoupons = isEditMode
    ? formData.coupons
    : formData.coupons.filter(
        (coupon) => coupon.code && coupon.discount && coupon.discountType
      );

  const updatedFormData = {
    ...formData,
    coupons: filteredCoupons,
    tags: formData.tags.split(",").map((tag) => tag.trim()),
  };

  console.log("Updated Form Data (Before Submit):", updatedFormData); // Debugging line

  const method = store ? "PUT" : "POST";
  const url = store
    ? `${process.env.REACT_APP_API_BASE_URL}/api/stores/id/${store._id}`
    : `${process.env.REACT_APP_API_BASE_URL}/api/stores`;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFormData),
    });

    if (response.ok) {
      alert(`${store ? "Store updated" : "Store created"} successfully!`);
      onClose(); // Close the form on success
    } else {
      const errorData = await response.json();
      console.error("Failed to save store:", errorData);
      alert(`Error: ${errorData.message || "Failed to save store"}`);
    }
  } catch (error) {
    console.error("Error saving store:", error);
    alert("An unexpected error occurred while saving the store.");
  }
};

  return (
    <div className="store-form">
      <h2>{store ? "Edit Store" : "Add New Store"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        {/* <input
          type="text"
          name="subdomain"
          value={formData.subdomain}
          onChange={handleChange}
          placeholder="Subdomain"
          required
        /> */}

        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="Logo URL"
        />
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Website URL"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Coupons Section */}
        <h3>Coupons</h3>
        {formData.coupons.map((coupon, index) => (
          <div key={index} className="coupon-item">
            <div className="coupon-details">
              <span>
                <strong>{coupon.code}</strong> - {coupon.discount}
                {coupon.discountType === "percentage" ? "%" : " (Fixed)"} off -{" "}
                {coupon.expiryDate
                  ? new Date(coupon.expiryDate).toLocaleDateString()
                  : "No Expiry"}
              </span>
              <span className="coupon-terms">
                {coupon.terms || "No Terms Provided"}
              </span>
              {coupon.isVerified && (
                <span className="verified-badge">Verified</span>
              )}
              {coupon.isFeatured && (
                <span className="featured-badge">Featured</span>
              )}
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeCoupon(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="new-coupon">
          <h4>Add New Coupon</h4>
          <input
            type="text"
            name="code"
            value={newCoupon.code}
            onChange={handleCouponChange}
            placeholder="Coupon Code"
            required={!isEditMode}
          />
          <textarea
            name="description"
            value={newCoupon.description}
            onChange={handleCouponChange}
            placeholder="Description"
          />
          <input
            type="number"
            name="discount"
            value={newCoupon.discount}
            onChange={handleCouponChange}
            placeholder="Discount Value"
            required={!isEditMode}
          />
          <select
            name="discountType"
            value={newCoupon.discountType}
            onChange={handleCouponChange}
            required={!isEditMode}
          >
            <option value="">Select Discount Type</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
          <input
            type="date"
            name="expiryDate"
            value={newCoupon.expiryDate}
            onChange={handleCouponChange}
          />
          <textarea
            name="terms"
            value={newCoupon.terms}
            onChange={handleCouponChange}
            placeholder="Terms & Conditions"
          />
          <label>
            <input
              type="checkbox"
              name="isVerified"
              checked={newCoupon.isVerified}
              onChange={handleCouponChange}
            />
            Verified
          </label>
          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={newCoupon.isFeatured}
              onChange={handleCouponChange}
            />
            Featured
          </label>

          <button type="button" onClick={addCoupon}>
            Add Coupon
          </button>
        </div>

        {/* New Fields Section */}
        <h3>Additional Store Details</h3>
        <textarea
          name="promotionalInfo"
          value={formData.promotionalInfo}
          onChange={handleChange}
          placeholder="Promotional Information"
        />
        <input
          type="text"
          name="pointsToKnow"
          value={formData.pointsToKnow}
          onChange={handleChange}
          placeholder="Points to Know (comma-separated)"
        />
        <label>
          <input
            type="checkbox"
            name="freeShipping"
            checked={formData.freeShipping}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                freeShipping: e.target.checked,
              }))
            }
          />
          Free Shipping
        </label>
        <label>
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isTrending: e.target.checked,
              }))
            }
          />
          is Trending
        </label>

        <label>
          <input
            type="checkbox"
            name="memberDiscount"
            checked={formData.memberDiscount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                memberDiscount: e.target.checked,
              }))
            }
          />
          Member Discount
        </label>
        <label>
          <input
            type="checkbox"
            name="militaryDiscount"
            checked={formData.militaryDiscount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                militaryDiscount: e.target.checked,
              }))
            }
          />
          Military Discount
        </label>

        <button type="submit">{store ? "Save Changes" : "Create Store"}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default StoreForm;
