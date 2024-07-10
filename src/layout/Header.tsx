import React from 'react';
import {FaUserCircle} from 'react-icons/fa';
import '../styles/Layout.scss';
import MenuPage from "../pages/MenuPage";

interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({onToggleSidebar}) => {
    return (
        <nav>
            <div>
                <button>
                    <MenuPage/>
                </button>
            </div>
            <button onClick={onToggleSidebar}>
                <FaUserCircle/>
            </button>
        </nav>
    );
};

export default Header;