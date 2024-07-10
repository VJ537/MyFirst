import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationSuccessPage: React.FC = () => {
    return (
        <div className="success-container">
            <h2>Registration Successful!</h2>
            <p>Please check your email to verify your account.</p>
            <Link to="/">Go to Login</Link>
        </div>
    );
};

export default RegistrationSuccessPage;
