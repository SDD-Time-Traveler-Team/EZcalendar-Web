import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import Calendar from "./Calendar";
import NavBar from './NavBar';
import Authentication from "../api/Authentication";
//import Database from "../api/Database"
import TagView from "./TagView";
import {Row, Col} from 'antd';

const Dashboard = () => {
    const [auth] = useState(new Authentication());
    const [loggedIn, setLoggedIn] = useState(true);
    const [eventTasks, setEventtasks] = useState([]);
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
                    <Col span={5}>
                        <TagView eventTasks={eventTasks} setEventtasks={setEventtasks}/>
                    </Col>
                    <Col span={19}>
                        <Calendar eventTasks={eventTasks} setEventtasks={setEventtasks}/>
                    </Col>
                </Row>
            </>
        </>
    );
}

export default Dashboard;
