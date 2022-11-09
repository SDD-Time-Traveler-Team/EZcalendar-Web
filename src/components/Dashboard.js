import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Row, Col} from 'antd';
import Calendar from "./Calendar";
import NavBar from './NavBar';
import TagMenu from "./TagMenu";
import Authentication from "../utils/Authentication";

const Dashboard = () => {
    const [auth] = useState(new Authentication());
    const [loggedIn, setLoggedIn] = useState(true);
    const [eventTasks, setEventtasks] = useState([]);
    const navigate = useNavigate();

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
                        <TagMenu eventTasks={eventTasks} setEventtasks={setEventtasks}/>
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
