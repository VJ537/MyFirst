import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const VerificationPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const verifyEmail = async () => {
            const query = new URLSearchParams(location.search);
            const token = query.get('token');
            const email = query.get('email');

            if (token && email) {
                try {
                    const response = await fetch(`http://...../verify?token=${token}&email=${email}`);
                    if (response.ok) {
                        setMessage('Email verified successfully. You can now log in.');
                        setTimeout(() => navigate('/login'), 3000);
                    } else {
                        setMessage('Invalid token or email. Verification failed.');
                    }
                } catch (error) {
                    console.error("Error verifying email:", error);
                    setMessage('Verification failed. Please try again.');
                }
            } else {
                setMessage('Invalid verification link.');
            }
        };

        verifyEmail();
    }, [location.search, navigate]);

    return (
        <div>
            <h2>{message}</h2>
        </div>
    );
};

export default VerificationPage;
