import React from 'react';
import '../styles/Layout.scss';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
    onChangePassword: () => void;

}

const Sidebar: React.FC<SidebarProps> = ({isOpen, onClose, onLogout, onChangePassword}) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>Close</button>
            <button onClick={onChangePassword}>Change Password</button>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Sidebar;