
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import CalendarViewUI from "./CalendarViewUI";
import NavBar from './NavBar';
import Authentication from "../api/Authentication";
//import Database from "../api/Database"
import TagView from "./TagView";
import { Row, Col } from 'antd';

const CalendarUI = () => {
    const [auth] = useState(new Authentication());
    const [loggedIn, setLoggedIn] = useState(true);
    const navigate = useNavigate();
//    const db = new Database();

    useEffect(() => {
        setLoggedIn(!!auth.user);

        // if signed out, redirect to /login
        if (!loggedIn) {
            navigate("/login");
            console.log("not logged in, redirect to /login");
            console.log(auth.user);
        }
    }, [auth.user, loggedIn, navigate]);

    return (
        <>
            <NavBar setLoginStatus={setLoggedIn}/>
             <>
                <Row>
                    <Col span = {5}>
                        <TagView />
                    </Col>
                    <Col span = {19}>
                        <CalendarViewUI />
                    </Col>
                </Row>
            </>
        </>
    );
}

export default CalendarUI;
