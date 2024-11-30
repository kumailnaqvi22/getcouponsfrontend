import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./CategoryList.css";

const CategoryList = ({ categories, onDelete }) => {
  return (
    <div className="category-list">
      <h2>Category List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.status}</td>
              <td>
                <Link to={`/admin/categories/edit/${category._id}`}>
                  <FaEdit /> Edit
                </Link>
                <button onClick={() => onDelete(category._id)}>
                  <FaTrashAlt /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
