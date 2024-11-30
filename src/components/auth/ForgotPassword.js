import React, { useState } from 'react';
import '../../styles/Forgot.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Password reset link sent');
            } else {
                alert(data.message || 'Failed to send reset link');
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to send reset link');
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <button className="submit-button" type="submit">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
