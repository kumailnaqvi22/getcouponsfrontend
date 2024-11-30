import React, { useState } from "react";
import ManageUsers from "./ManageUsers";
import ManageStores from "./ManageStores";
// import ManageCoupons from "./ManageCoupons";
import CategoryManagement from "./CategoryManagement";
import Messages from "./Messages"; // Import Messages component
import { FiUsers, FiShoppingBag,  FiFolderPlus, FiMail } from "react-icons/fi"; // Import icons
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [view, setView] = useState("users");

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-dashboard-buttons">
        <button onClick={() => setView("users")}>
          <FiUsers /> Manage Users
        </button>
        <button onClick={() => setView("stores")}>
          <FiShoppingBag /> Manage Stores
        </button>
        {/* <button onClick={() => setView("coupons")}>
          <FiTag /> Manage Coupons
        </button> */}
        <button onClick={() => setView("categories")}>
          <FiFolderPlus /> Manage Categories
        </button>
        <button onClick={() => setView("messages")}>
          <FiMail /> Manage Messages
        </button>
      </div>
      <div className="admin-dashboard-content">
        {view === "users" && <ManageUsers />}
        {view === "stores" && <ManageStores />}
        {/* {view === "coupons" && <ManageCoupons />} */}
        {view === "categories" && <CategoryManagement />}
        {view === "messages" && <Messages />}
      </div>
    </div>
  );
};

export default AdminDashboard;
