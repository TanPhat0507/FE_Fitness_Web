import React, { useState } from 'react';
import '../../styles/pages/Signup.css';
import { useNavigate } from 'react-router-dom';
import gg_logo from '../../Image/gg_icon.png';
import logo from '../../Image/Logo.svg'; // Adjusted path for the logo
const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!username || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const userData = {
            username: username.trim(),
            email: email.trim(),
            password: password,
        };

        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setError('');
                navigate('/authentication');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed.');
            }
        } catch (error) {
            setError('An error occurred during registration.');
        }
    };

    return (
        <div className="signup-container">

<img src={logo} alt="Logo" className="logo-top-left" />
            
            <div className="signup-box">
                <h2>Create account</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="checkbox-container">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        I agree to WellTrack Terms of service and Privacy policy
                    </label>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button onClick={handleSignup} className="signup-button">
                    Create an account
                </button>
                <p className="or-divider">or</p>
                <button className="google-button">
                    <img src={gg_logo} alt="Google logo" />
                    Continue with Google
                </button>
                <p className="login-prompt">
                    Already have an account? <a href="/login" className="login-link">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
