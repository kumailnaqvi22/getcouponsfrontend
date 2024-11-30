// src/components/auth/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setOtpSent(true);
      alert("OTP sent to your email. Please check and verify.");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Registration failed");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      // Store the token in localStorage to keep the user logged in
      localStorage.setItem("token", data.token);

      alert("Registration successful. You are now logged in.");
      
      // Navigate to the homepage and force a page reload to reflect updated state
      navigate("/", { replace: true });
      window.location.reload(); // This forces a page reload after successful OTP verification
    } catch (error) {
      console.error("Error:", error.message);
      alert("OTP verification failed");
    }
  };

  return (
    <div className="register-page">
      <div className="form-container">
        {!otpSent ? (
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />{" "}
                Show Password
              </label>
            </div>
            <button className="submit-button" type="submit">
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification}>
            <h1>Enter OTP</h1>
            <div className="form-group">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>
            <button className="submit-button" type="submit">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
