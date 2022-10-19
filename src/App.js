import './App.css';
import CalendarUI from './components/CalendarUI'
import React from 'react';
import LoginPage from './components/LoginPage'
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SignupPage from './components/SignupPage';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                path="/" element={<Navigate to = '/login'/>}
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
                    exact path={"/calendar"}
                    element={<CalendarUI/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
