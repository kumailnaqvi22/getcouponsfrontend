import React, { useState, useEffect } from "react";
import CouponForm from "./CouponForm"; // Import the CouponForm component
import { FiEdit, FiTrash } from "react-icons/fi"; // Icons for edit and delete
import "./ManageCoupons.css"; // Styling for this component

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [view, setView] = useState("list");

  // Fetch coupons from API
  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/coupons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setCoupons(data.coupons);
      } else {
        console.error("Failed to fetch coupons:", data.message);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setView("form");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/coupons/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          fetchCoupons();
        } else {
          console.error("Failed to delete coupon");
        }
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    }
  };

  return (
    <div className="manage-coupons">
      {view === "list" && (
        <>
          <button onClick={() => setView("form")}>Add New Coupon</button>
          <ul>
            {coupons.map((coupon) => (
              <li key={coupon._id}>
                <span>{coupon.code}</span>
                <div className="action-icons">
                  <FiEdit onClick={() => handleEdit(coupon)} className="icon edit-icon" />
                  <FiTrash onClick={() => handleDelete(coupon._id)} className="icon delete-icon" />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {view === "form" && (
        <CouponForm
          coupon={selectedCoupon}
          onClose={() => {
            setSelectedCoupon(null);
            setView("list");
            fetchCoupons();
          }}
        />
      )}
    </div>
  );
};

export default ManageCoupons;
