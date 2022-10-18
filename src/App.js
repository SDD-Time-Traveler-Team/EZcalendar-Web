import './App.css';
import CalendarUI from './components/CalendarUI'
import React from 'react';
import LoginPage from './components/LoginPage'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import SignupPage from './components/SignupPage';
import Authentication from './api/Authentication';

const App = () => {
    const ROUTES = {
        LOGIN: "/login",
        SIGNUP: "/signup",
        CALENDAR: "/calendar"
    };
    //const [auth] = useState(new Authentication());
    return (
        <BrowserRouter>
            <Routes>
                <Route
                path="/" element={<LoginPage/>}
                />
                <Route
                    exact path={ROUTES.LOGIN}
                    element={<LoginPage/>}
                />
                <Route
                    exact path={ROUTES.SIGNUP}
                    element={<SignupPage/>}
                />
                <Route
                    exact path={(new Authentication().user!=null)?ROUTES.CALENDAR:ROUTES.LOGIN}
                    element={new Authentication().user==null?<LoginPage/>:<CalendarUI/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
