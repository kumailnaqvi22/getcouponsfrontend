import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiUser, FiMenu, FiX, FiLogOut, FiLogIn, FiUserPlus, FiLayout } from "react-icons/fi";
import Suggestions from "./Suggestions";
import "../../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const profileDropdownRef = useRef(null);

  // Fetch all stores once
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/stores`);
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
    fetchStores();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
      setIsLoggedIn(true);
      setIsAdmin(user.isAdmin);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
    window.location.reload();
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 2) {
      const results = stores.filter((store) =>
        Object.values(store)
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredStores(results);
      setShowSuggestions(true);
    } else {
      setFilteredStores([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (storeId) => {
    navigate(`/store/${storeId}`);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  return (
    <>
      <header>
        <nav>
          <Link to="/" className="logo">
            <img
              src="https://i.ibb.co/bK5nHSP/Whats-App-Image-2024-12-22-at-11-10-10-AM-removebg-preview.png"
              alt="Logo"
              className="header-logo"
            />
          </Link>

          <ul className={`nav-links ${isNavOpen ? "show-nav" : ""}`}>
          {["shop", "coupon", "categories", "about", "contact"].map((route) => (
  <li key={route}>
    <Link
      to={`/${route}`}
      className={location.pathname === `/${route}` ? "active-link" : ""}
      onClick={() => setIsNavOpen(false)}
    >
      {route.charAt(0).toUpperCase() + route.slice(1)}
    </Link>
  </li>
))}

          </ul>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Your Brands Here"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay for clicks
              className="search-input"
            />
            <button className="search-button">
              <img
                src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                alt="Search Icon"
                className="search-icon"
              />
            </button>
          </div>

          <div className="user-icons">
            <button className="nav-toggle" onClick={toggleNavMenu}>
              {isNavOpen ? <FiX /> : <FiMenu />}
            </button>
            {isLoggedIn ? (
              <div ref={profileDropdownRef}>
                <button className="profile-icon" onClick={toggleProfileDropdown}>
                  <FiUser />
                </button>
                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    {isAdmin ? (
                      <Link to="/admin" onClick={() => setShowProfileDropdown(false)}>
                        <button className="dashboard-button">
                          <FiLayout /> Dashboard
                        </button>
                      </Link>
                    ) : (
                      <Link to="/user/profile" onClick={() => setShowProfileDropdown(false)}>
                        <button className="profile-button">
                          <FiUser /> Profile
                        </button>
                      </Link>
                    )}
                    <button className="logout-button" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="login-button">
                    <FiLogIn />
                  </button>
                </Link>
                <Link to="/register">
                  <button className="signup-button">
                    <FiUserPlus />
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      {showSuggestions && (
        <div className="floating-suggestions">
          <Suggestions stores={filteredStores} onClick={handleSuggestionClick} />
        </div>
      )}
    </>
  );
};

export default Header;
