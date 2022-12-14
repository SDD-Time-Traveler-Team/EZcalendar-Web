import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Row, Col} from "antd";
import Calendar from "./Calendar";
import NavBar from "./NavBar";
import TagMenu from "./TagMenu";
import Authentication from "../utils/Authentication";
import {getAllEvents, getAllTasks} from "../utils/Database";
import {getESTISOString} from "../utils/TimeParser";

const Dashboard = () => {
    const [auth] = useState(new Authentication());
    const [events, setEvents] = useState([]); // events {id, title, tagId, startTime, endTime}
    const [tasks, setTasks] = useState([]); // tasks {id, title, tagId, startTime, endTime, completed}
    const [renderCount, setRenderCount] = useState(1); // this is used to force-rerender Calendar
    const navigate = useNavigate();

    useEffect(() => {
        // retrieve authenticated user if logged in
        auth.retrieveAuthenticatedUser().then((user) => {
            auth.user = user
            auth.email = user.attributes.email
        }).catch((err) => {
            // catching an error means not logged in
            navigate("/login");
        }).then(() => {
            fetchAllEventsAndTasks()
        })
    }, [auth.email]);

    const fetchAllEventsAndTasks = () => {
        getAllEvents(auth.email).then((res) => {
            let newEvents = res.data.map((event) => ({
                id: event.id,
                title: event.title,
                tagId: event.tag_id,
                startTime: getESTISOString(event.start_time),
                endTime: getESTISOString(event.end_time)
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
                startTime: getESTISOString(task.start_time),
                endTime: getESTISOString(task.end_time),
                completed: task.completed
            }))
            setTasks(newTasks)
            setRenderCount(renderCount + 1)
        }).catch((err) => {
            console.log(err)
        })
    }

    //dashboard components
    return (
        <>
            <NavBar/>
            <Row>
                <Col span={5}>
                    <TagMenu setEvents={setEvents} setTasks={setTasks} fetchAllEventsAndTasks={fetchAllEventsAndTasks}/>
                </Col>
                <Col span={19}>
                    <Calendar
                        events={events}
                        setEvents={setEvents}
                        tasks={tasks}
                        setTasks={setTasks}
                        renderCount={renderCount}
                        fetchAllEventsAndTasks={fetchAllEventsAndTasks}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;
