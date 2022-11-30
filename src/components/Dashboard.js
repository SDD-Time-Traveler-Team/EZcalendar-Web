import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Row, Col} from "antd";
import Calendar from "./Calendar";
import NavBar from "./NavBar";
import TagMenu from "./TagMenu";
import Authentication from "../utils/Authentication";
import {getAllEvents, getAllTasks} from "../utils/Database";

const Dashboard = () => {
    const [auth] = useState(new Authentication());
    const [loggedIn, setLoggedIn] = useState(true);
    const [events, setEvents] = useState([]); // events {id, title, tagId, startTime, endTime}
    const [tasks, setTasks] = useState([]); // tasks {id, title, tagId, startTime, endTime, completed}
    const [renderCount, setRenderCount] = useState(1); // this is used to force-rerender Calendar
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(!!auth.user);

        // if signed out, redirect to /login
        if (!loggedIn) {
            navigate("/login");
            console.log("not logged in, redirect to /login");
            console.log(auth.user);
        }

        getAllEvents(auth.email).then((res) => {
            let newEvents = res.data.map((event) => ({
                id: event.id,
                title: event.title,
                tagId: event.tag_id,
                startTime: event.start_time,
                endTime: event.end_time
            }))
            setEvents(newEvents)
            setRenderCount(renderCount + 1)
        }).catch((err) => {
            console.log(err)
        })

        getAllTasks(auth.email).then((res) => {
            let newTasks = res.data.map((task) => ({
                id: task.id,
                title: task.title,
                tagId: task.tag_id,
                startTime: task.start_time,
                endTime: task.end_time,
                completed: task.completed
            }))
            setTasks(newTasks)
            setRenderCount(renderCount + 1)
        }).catch((err) => {
            console.log(err)
        })

    }, [auth.email, auth.user, loggedIn, navigate]);

    //dashboard components
    return (
        <>
            <NavBar setLoginStatus={setLoggedIn}/>
            <Row>
                <Col span={5}>
                    <TagMenu events={events} tasks={tasks} setEvents={setEvents} setTasks={setTasks}/>
                </Col>
                <Col span={19}>
                    <Calendar
                        events={events}
                        setEvents={setEvents}
                        tasks={tasks}
                        setTasks={setTasks}
                        renderCount={renderCount}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
