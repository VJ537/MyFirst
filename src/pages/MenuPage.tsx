import React, {useState} from 'react';
import {FaList} from 'react-icons/fa';
import {Link} from 'react-router-dom';

const MenuPage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <FaList style={{fontSize: '24px', cursor: 'pointer'}} onClick={toggleSidebar}/>

            <div style={{
                display: isSidebarOpen ? 'block' : 'none',
                width: '200px',
                height: '100vh',
                backgroundColor: '#333',
                position: 'fixed',
                top: 69,
                left: 0
            }}>
                <ul>
                    <li><Link to="/list" onClick={toggleSidebar}>List</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default MenuPage;