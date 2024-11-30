import React, { useState, useEffect } from "react";
import StoreForm from "./StoreForm";
import { FiEdit, FiTrash } from "react-icons/fi";
import "./ManageStores.css";

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [view, setView] = useState("list");

  // Fetch stores from API
  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/stores`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setStores(data.stores);
      } else {
        console.error("Failed to fetch stores:", data.message);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleEdit = (store) => {
    setSelectedStore(store);
    setView("form");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/stores/id/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          fetchStores();
        } else {
          console.error("Failed to delete store");
        }
      } catch (error) {
        console.error("Error deleting store:", error);
      }
    }
  };

  return (
    <div className="manage-stores">
      {view === "list" && (
        <>
          <button onClick={() => setView("form")}>Add New Store</button>
          <ul>
            {stores.map((store) => (
              <li key={store._id}>
                <span>{store.name}</span>
                <div className="action-icons">
                  <FiEdit onClick={() => handleEdit(store)} className="icon edit-icon" />
                  <FiTrash onClick={() => handleDelete(store._id)} className="icon delete-icon" />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {view === "form" && (
        <StoreForm
          store={selectedStore}
          onClose={() => {
            setSelectedStore(null);
            setView("list");
            fetchStores();
          }}
        />
      )}
    </div>
  );
};

export default ManageStores;
