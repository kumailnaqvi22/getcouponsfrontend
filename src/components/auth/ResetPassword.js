import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Password reset successful');
        navigate('/login');
      } else {
        alert(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to reset password');
    }
  };

  return (
    <div className="reset-password-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <button className="submit-button" type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
