import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import CalendarViewUI from "./CalendarViewUI";
import NavBar from './NavBar';
import Authentication from "../api/Authentication";

const CalendarUI = () => {
    const [auth] = useState(new Authentication());
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(!!auth.user)

        // if signed out, redirect to /login
        if (!loggedIn) {
            navigate("/login");
        }
    }, [auth.user, loggedIn, navigate]);

    return (
        <>
            <NavBar signOut={auth.signOut}/>
            <CalendarViewUI/>
        </>
    );
}

export default CalendarUI;
