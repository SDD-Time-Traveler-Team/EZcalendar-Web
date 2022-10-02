import './App.css';
import CalendarUI from './components/CalendarUI'
import React from "react";
import LoginPage from './components/LoginPage'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//class App extends React.Component {
function App() {
    // render(){
        const ROUTES = {
            MAINPAGE: "/",
            LOGIN: "/login",
        };

        return (
            // <BrowserRouter>
                <main>
                    <Routes>
                        {/* <Route
                            exact path={"/"}
                            element={<Navigate to={ROUTES.MAINPAGE}/>}
                        />
                        <Route
                            exact path={ROUTES.LOGIN}
                            element={<LoginPage/>}
                        /> */}
                        <Route
                            exact path={ROUTES.MAINPAGE}
                            element={<>Hello World</>}
                        />
                    </Routes>
                </main>
            // </BrowserRouter>
        );
    // }
}

/*
<BrowserRouter>
    <Router>
        <div>
            <Route path="/" component={CalendarUI} />
            <Route exact path="/login" component={LoginPage} />
        </div>
    </Router>
</BrowserRouter>
*/

export default App;
