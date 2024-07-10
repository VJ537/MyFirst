import React, {useState} from 'react';
import {FaUser, FaEye, FaEyeSlash, FaLock} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/login-page.scss';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        if (email === storedEmail && password === storedPassword) {
            navigate('/HomePage');
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUser className="icon icon-lock"/>
                </div>
                <div className="input-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {showPassword ? (
                        <FaEyeSlash className="icon icon-eye" onClick={togglePasswordVisibility}/>
                    ) : (
                        <FaEye className="icon icon-eye" onClick={togglePasswordVisibility}/>
                    )}
                    <FaLock className="icon icon-lock"/>

                </div>
                <div>
                    <button type="submit">Login Now</button>
                </div>
            </form>
            <div>
                <p>
                    Don't have an account? <Link to="/RegistrationPage">Sign Up Here..</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;