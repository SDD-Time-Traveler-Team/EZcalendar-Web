import './App.css';
import CalendarUI from './components/CalendarUI'
import React from "react";
import LoginPage from './components/LoginPage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from './components/SignupPage';

class App extends React.Component {

    render(){
        const ROUTES = {
            LOGIN: "/login",
            CALENDAR: "/calendar",
            SIGNUP: "/signup"
        };

        return (
            <BrowserRouter>
                <Routes>
                    <Route
                        exact path={ROUTES.LOGIN}
                        element={<LoginPage/>}
                    />
                    <Route
                        exact path={ROUTES.CALENDAR}
                        element={<CalendarUI/>}
                    />
                    <Route
                        exact path={ROUTES.SIGNUP}
                        element={<SignupPage/>}
                    />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
