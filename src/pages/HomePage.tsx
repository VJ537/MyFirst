import React, {useState} from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import '../styles/Layout.scss';
import {useNavigate} from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import ChangePasswordModal from "./ChangePassword";

const HomePage: React.FC = () => {
    const fullname = localStorage.getItem('fullname');
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    const handleLogout = () => {
        console.log("User logged out.");
        navigate('/');
    };

    const handleChangePassword = () => {
        setIsChangePasswordModalOpen(true);
    };

    const handleChangePasswordSubmit = (oldPassword: string, newPassword: string) => {
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);
        setIsChangePasswordModalOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="page-container">
            <Header onToggleSidebar={toggleSidebar}/>
            <main>
                <div className="centered-message">
                    {fullname && <h1>Hey {fullname}, Welcome to our website</h1>}
                    <h2>This is the homepage of our website.</h2>
                </div>
            </main>
            <Footer/>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
                onChangePassword={handleChangePassword}/>
            {isChangePasswordModalOpen && (
                <ChangePasswordModal
                    onClose={() => setIsChangePasswordModalOpen(false)}
                    onSubmit={handleChangePasswordSubmit}
                />
            )}
        </div>
    );
};

export default HomePage;