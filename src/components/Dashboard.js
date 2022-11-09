import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import Calendar from "./Calendar";
import NavBar from "./NavBar";
import TagMenu from "./TagMenu";
import Authentication from "../utils/Authentication";

const Dashboard = () => {
    const [auth] = useState(new Authentication());
    const [loggedIn, setLoggedIn] = useState(true);
    const [events, setEvents] = useState([]); // events {id, title, tagId, startTime, endTime}
    const [tasks, setTasks] = useState([]); // tasks {id, title, tagId, startTime, endTime, completed}
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
            <NavBar setLoginStatus={setLoggedIn} />
            <Row>
                <Col span={5}>
                    <TagMenu events={events} tasks={tasks} setEvents={setEvents} setTasks={setTasks} />
                </Col>
                <Col span={19}>
                    <Calendar
                        events={events}
                        setEvents={setEvents}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
