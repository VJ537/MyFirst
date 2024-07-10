import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Sidebar from "../layout/Sidebar";
import ChangePasswordModal from "./ChangePassword";
import AddEditListPage from "./AddEditListPage";
import '../styles/listPage.scss';
import SmartTable, {getColumns} from "../Components/SmartTable";

interface Item {
    id: number;
    name: string;
    bankName: string;
    bankAccountNumber: string;
    aadharNumber: string;
    descriptions: string;
}

const ListPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
    const [areFiltersVisible, setAreFiltersVisible] = useState<boolean>(true);

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    const handleLogout = () => {
        console.log("User logged out.");
        navigate('/');
    };

    const handleChangePassword = () => {
        setIsChangePasswordModalOpen(true);
    };

    const handleAddItem = (item: Item) => {
        const newItems = [...items, item];
        setItems(newItems);
        localStorage.setItem('items', JSON.stringify(newItems));
    };

    const handleEditItem = (item: Item) => {
        const updatedItems = items.map(i => (i.id === item.id ? item : i));
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    const handleDeleteItem = useCallback((id: number) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    }, [items]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleAddClick = () => {
        setCurrentItem(null);
        setIsAddEditModalOpen(true);
    };

    const handleEditClick = (item: Item) => {
        setCurrentItem(item);
        setIsAddEditModalOpen(true);
    };

    const handleChangePasswordSubmit = (oldPassword: string, newPassword: string) => {
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);
        setIsChangePasswordModalOpen(false);
    };

    const handleAddEditSubmit = (item: Item) => {
        if (currentItem) {
            handleEditItem(item);
        } else {
            handleAddItem(item);
        }
        setIsAddEditModalOpen(false);
    };

    const handleToggleFilters = () => {
        setAreFiltersVisible(!areFiltersVisible);
    };

    return (
        <Container className="page-container">
            <Header onToggleSidebar={toggleSidebar}/>
            <main>
                <div className="list-page-header">
                    <h1 className="page-title">List Page</h1>
                </div>
                <SmartTable
                    name="ItemsTable"
                    columns={getColumns(handleEditClick, handleDeleteItem)}
                    data={items}
                    showFilter={areFiltersVisible}
                    onAddClick={handleAddClick}
                    onToggleFilters={handleToggleFilters}
                    areFiltersVisible={areFiltersVisible}
                />
            </main>
            <Footer/>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
                onChangePassword={handleChangePassword}
            />
            {isChangePasswordModalOpen && (
                <ChangePasswordModal
                    onClose={() => setIsChangePasswordModalOpen(false)}
                    onSubmit={handleChangePasswordSubmit}
                />
            )}
            <AddEditListPage
                show={isAddEditModalOpen}
                onHide={() => setIsAddEditModalOpen(false)}
                onSubmit={handleAddEditSubmit}
                item={currentItem}
            />
        </Container>
    );
};

export default ListPage;
