import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing Components
import Header from './components/common/Header';
import Home from './components/common/Home';
import ContactUs from './components/common/ContactUs';
import About from './components/common/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import UserProfile from './components/user/UserProfile';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ShopPage from './components/common/ShopPage';
import HeaderCoupens from './components/common/headerCoupens'; // Import headerCoupens
import CategoriesPage from './components/common/CategoriesPage';
import StoreDetailPage from './components/common/StoreDetailPage';
import Preloader from './components/common/Preloader';
import Footer from './components/common/Footer';
import LatestCoupons from "./components/common/LatestCoupons";
import CopyCoupon from "./components/common/CopyCoupon";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate preloader with a timeout
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/coupon" element={<HeaderCoupens />} /> {/* Use headerCoupens */}
          <Route path="/store-details/:storeId" element={<StoreDetailPage />} />

          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/store/:id" element={<StoreDetailPage />} />
          <Route path="/copy-coupon/:couponCode" element={<CopyCoupon />} />
          <Route path="/latest-coupons" element={<LatestCoupons />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
};
 
export default App;