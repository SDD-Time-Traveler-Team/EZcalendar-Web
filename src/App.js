import './App.css';
import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard'

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/" element={<Navigate to='/login'/>}
                />
                <Route
                    exact path={"/login"}
                    element={<LoginPage/>}
                />
                <Route
                    exact path={"/signup"}
                    element={<SignupPage/>}
                />
                <Route
                    exact path={"/dashboard"}
                    element={<Dashboard/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
