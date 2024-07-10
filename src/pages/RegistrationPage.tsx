import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import EmailValidation from "../validators/EmailValidation";
import '../styles/registration-page.scss'; // Import the SCSS file

const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (!EmailValidation(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch('http://..../register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullname, email, password })
            });
            if (response.ok) {
                alert('Verification email sent. Please check your inbox.');
                navigate('/registration-success');
            } else {
                setError('Failed to send verification email. Please try again.');
            }
        } catch (error) {
            console.error("Error sending verification email:", error);
            setError('Failed to send verification email. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="registration-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon icon-lock" />
                    {showPassword ?
                        <FaEyeSlash className="icon icon-eye" onClick={togglePasswordVisibility} /> :
                        <FaEye className="icon icon-eye" onClick={togglePasswordVisibility} />
                    }
                </div>
                <div className="input-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon icon-lock" />
                    {showPassword ?
                        <FaEyeSlash className="icon icon-eye" onClick={togglePasswordVisibility} /> :
                        <FaEye className="icon icon-eye" onClick={togglePasswordVisibility} />
                    }
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Register Now</button>
            </form>
            <div>
                <p>Already have an account? <Link to="/">Login Now</Link></p>
            </div>
        </div>
    );
};

export default RegistrationPage;
