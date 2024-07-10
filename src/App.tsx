import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import RegisterSuccess from "./pages/RegisterSuccess";
import HomePage from "./pages/HomePage";
import './styles/Layout.scss';
import ListPage from "./pages/ListPage";

const App = () => {

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/RegistrationPage" element={<RegistrationPage/>}/>
                        <Route path="/registration-success" element={<RegisterSuccess/>}/>
                        <Route path="/HomePage" element={<HomePage/>}/>
                        <Route path={'list'} Component={ListPage}/>
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export {App};