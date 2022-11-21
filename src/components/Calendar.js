import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Checkbox, DatePicker, Form, Input, Modal, TimePicker, Divider, Col, Row } from "antd";
import { useEffect } from "react";
import { click } from "@testing-library/user-event/dist/click";
//import listPlugin from '@fullcalendar/list';

import moment from 'moment-timezone';

moment.tz.setDefault("America/New_York");

const { RangePicker } = DatePicker;

const rangeConfig = {
    rules: [
        {
        type: 'array',
        required: true,
        message: 'Please select time!',
        },
    ],
};

const Calendar = ({ events, setEvents, tasks, setTasks }) => {

    const calendarRef = React.createRef(); // reference to Full Calendar
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClickedTask, setIsClickedTask] = useState(false);
    const [completeBoxChecked, setCompleteBoxChecked] = useState(false);
    const [modifiedEventTitle, setModifiedEventTitle] = useState("");
    const [modifiedEventTime, setModifiedEventTime] = useState([]);
    const [clickItemId, setClickItemId] = useState();

    const [newTitleDisabled, setNewTitleDisabled] = useState(true);
    const [newRangeDisabled, setNewRangeDisabled] = useState(true);
    //var clickedEventId = "default placeholder";

    // useEffect(() => {
    //     clickedEventId = clickItemId
    // }, [clickItemId])

    //TODO: connect to db :)
    //handle updating event and task object outside of the calendar
    const onEventChange = ({ event, oldEvent, _ }) => {

        //TODO: change in db
        if (oldEvent.extendedProps.hasOwnProperty("completed")) {
            // task
            setTasks((prev) =>
                prev.map((task) => {
                    //  task {id, title, tagId, start, end, completed}
                    if ("task" + task.id === oldEvent.id) {
                        return {
                            id: task.id,
                            title: event.title,
                            start: event.start,
                            end: event.end,
                            tagId: event.extendedProps.tagId,
                            completed: event.extendedProps.completed,
                        };
                    } else {
                        return task;
                    }
                })
            );
        } else {
            // event
            setEvents((prev) =>
                prev.map((item) => {
                    if ("event" + item.id === oldEvent.id) {
                        return {
                            id: item.id,
                            title: event.title,
                            start: event.start,
                            end: event.end,
                            tagId: event.extendedProps.tagId,
                        };
                    } else {
                        return item;
                    }
                })
            );
        }
    };

    //handle removing things from 
    const onEventRemove = ({ event, _ }) => {
        //TODO: remove in db
        if (event.extendedProps.hasOwnProperty("completed")) {
            // task
            setTasks((prev) => prev.filter((task) => "task" + task.id !== event.id));
        } else {
            // event
            setEvents((prev) => prev.filter((item) => "event" + item.id !== event.id));
        }
    };

    //handle events after clicking on calendar items
    const onEventClick = async ({ event }) => {
        setIsModalOpen(true);
        setClickItemId(event.id)
        setIsClickedTask(false)
        if(event.extendedProps.hasOwnProperty("completed"))
        {
            setIsClickedTask(true)
            setCompleteBoxChecked(event.extendedProps.completed)
        }
        setModifiedEventTitle(event.title);
        setNewRangeDisabled(false);
        setNewTitleDisabled(false);
    };

    //handle modal OK button
    const onModalOk = () => {
        let event = calendarRef.current.getApi().getEventById(clickItemId);
        if(modifiedEventTitle !== "" && newTitleDisabled === true)
        {
            event.setProp("title", modifiedEventTitle)
        }
        if(newRangeDisabled === true)
        {
            event.setStart(modifiedEventTime[0].format("YYYY-MM-DDTHH:mm:ss"))
            event.setEnd(modifiedEventTime[1].format("YYYY-MM-DDTHH:mm:ss"))
        }
        event.setExtendedProp("completed", completeBoxChecked)
        if(event.extendedProps.completed === true)
        {
            event.setProp("backgroundColor", "red")
            console.log(event.backgroundColor)
        }
        setIsModalOpen(false);
    };

    //handle modal cancel button
    const onModalCancel = () => {
        setIsModalOpen(false)
    };

    //handle deleting event from calendar
    const onDeleteEvent = () => {
        calendarRef.current.getApi().getEventById(clickItemId).remove();
        setIsModalOpen(false)
    };

    //components in calendar
    return (
        <>
            <Modal
                title="Modify or Delete"
                open={isModalOpen}
                //onOk={onModalOk}
                onOk={onModalOk}
                onCancel={onModalCancel}
            >

                {false ? (
                    <Divider>
                        {/* Must include this divider. Do not delete it! */}
                        {clickItemId}
                    </Divider>
                ) : (
                    <></>
                )}
                <Row justify="center">
                    {isClickedTask ? (
                        <Checkbox defaultChecked={false} onChange={(e) => setCompleteBoxChecked(e.target.checked)}>
                            Complete
                        </Checkbox>
                    ) : (
                        <></>
                    )}
                    <Button type="primary" danger size="large" onClick={onDeleteEvent}>
                        Delete
                    </Button>
                </Row>
                

                <Row>
                    <Checkbox checked={newRangeDisabled} onChange={(e) => {setNewRangeDisabled(e.target.checked)}}>Modify Time</Checkbox>
                    <RangePicker {...rangeConfig} showTime format="YYYY-MM-DD HH:mm:ss" disabled={!newRangeDisabled} onChange={(value) => {setModifiedEventTime(value);}}/>
                </Row>
                
                <Row>
                    <Checkbox checked={newTitleDisabled} onChange={(e) => {setNewTitleDisabled(e.target.checked)}}>Modify Title</Checkbox>
                    <Input 
                        showCount 
                        maxLength={20}
                        defaultValue=""
                        onChange={(e) => {setModifiedEventTitle(e.target.value)}}
                        disabled={!newTitleDisabled}
                        placeholder={modifiedEventTitle}
                    />
                </Row>
            </Modal>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    center: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                editable
                timeZone='EST'
                events={events.concat(tasks).map((event) => {
                    const newEvent = {
                        title: event.title,
                        start: event.start,
                        end: event.end,
                        textColor: "#2F4F4F",
                        extendedProps: {
                            tagId: event.tagId,
                        },
                    };

                    if (event.hasOwnProperty("completed")) {
                        // task
                        newEvent.id = `task${event.id}`;
                        newEvent.extendedProps.completed = event.completed;
                        newEvent.backgroundColor = "#1E90FF";
                    } else {
                        // event
                        newEvent.id = `event${event.id}`;
                        newEvent.backgroundColor = "#FFE4B5";
                    }

                    return newEvent;
                })}
                eventChange={onEventChange}
                eventRemove={onEventRemove}
                eventClick={onEventClick}
            />
        </>
    );
};

export default Calendar;
