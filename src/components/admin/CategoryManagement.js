import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import "./CategoryManagement.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/categories`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [categories]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/categories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCategories(categories.filter((category) => category._id !== id));
      } else {
        console.error("Error deleting category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="category-management">
      <button onClick={() => setShowForm(true)}>Add Category</button>
      {showForm && <CategoryForm category={editingCategory} onClose={closeForm} />}
      {!showForm && (
        <CategoryList categories={categories} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default CategoryManagement;
