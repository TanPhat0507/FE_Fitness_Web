import React, { useState } from 'react';
import '../../styles/pages/Login.css'; // Reusing Login.css for shared styles
import { useNavigate } from 'react-router-dom';
import logo from '../../Image/Logo.svg';

const Resetpw = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Password reset logic goes here, e.g., calling an API endpoint
        try {
            const response = await fetch('http://localhost:3000/api/users/reset-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            });

            if (response.ok) {
                setError('');
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to reset password.');
            }
        } catch (error) {
            setError('An error occurred.');
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="logo-top-left" />

            <div className="login-box">
                <h2>Reset Password</h2>
                <p className="enter_email">Choose a new password for your account</p>

                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button onClick={() => navigate('/login')} className="back-to-login-button">
                    Back to login
                </button>
                <button onClick={handleResetPassword} className="reset-password-button">
                    Reset password
                </button>
            </div>
        </div>
    );
};

export default Resetpw;
