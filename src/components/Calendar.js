import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Button, Checkbox, DatePicker, Input, Modal, Divider, Row} from "antd";
import moment from 'moment-timezone';
import {deleteEvent, deleteTask, updateEvent, updateTask} from "../utils/Database";
import Authentication from "../utils/Authentication";

moment.tz.setDefault("America/New_York");

const {RangePicker} = DatePicker;

const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
    ],
};

const Calendar = ({events, setEvents, tasks, setTasks, renderCount, fetchAllEventsAndTasks}) => {

    const calendarRef = React.createRef(); // reference to Full Calendar

    const [auth] = useState(new Authentication());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClickedTask, setIsClickedTask] = useState(false);
    const [completeBoxChecked, setCompleteBoxChecked] = useState(false);
    const [modifiedEventTitle, setModifiedEventTitle] = useState("");
    const [modifiedEventTime, setModifiedEventTime] = useState([]);
    const [clickItemId, setClickItemId] = useState();

    const [newTitleDisabled, setNewTitleDisabled] = useState(true);
    const [newRangeDisabled, setNewRangeDisabled] = useState(true);

    //handle updating event and task object outside of the calendar
    const onEventChange = ({event, oldEvent, revert}) => {
        if (oldEvent.extendedProps.hasOwnProperty("completed")) {
            // task
            updateTask(event.id.slice(4), auth.email, event.title, event.extendedProps.tagId, "", event.start, event.end, event.extendedProps.completed).then(() => {
                fetchAllEventsAndTasks()
            }).catch((err) => {
                console.log(err)
                revert()
            })
        } else {
            // event
            updateEvent(event.id.slice(5), auth.email, event.title, event.extendedProps.tagId, "", event.start, event.end).then(() => {
                fetchAllEventsAndTasks()
            }).catch((err) => {
                console.log(err)
                revert()
            })
        }
    };

    //handle removing things from 
    const onEventRemove = ({event, revert}) => {
        if (event.extendedProps.hasOwnProperty("completed")) {
            // task
            deleteTask(auth.email, event.id.slice(4)).then(() => {
                fetchAllEventsAndTasks()
            }).catch((err) => {
                console.log(err)
                revert()
            })
        } else {
            // event
            deleteEvent(auth.email, event.id.slice(5)).then(() => {
                fetchAllEventsAndTasks()
            }).catch((err) => {
                console.log(err)
                revert()
            })
        }
    };

    //handle events after clicking on calendar items
    const onEventClick = async ({event}) => {
        setIsModalOpen(true);
        setClickItemId(event.id)
        setIsClickedTask(false)
        if (event.extendedProps.hasOwnProperty("completed")) {
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
        if (modifiedEventTitle !== "" && newTitleDisabled === true) {
            event.setProp("title", modifiedEventTitle)
        }
        if (newRangeDisabled === true) {
            event.setStart(modifiedEventTime[0].format("YYYY-MM-DDTHH:mm:ss"))
            event.setEnd(modifiedEventTime[1].format("YYYY-MM-DDTHH:mm:ss"))
        }
        event.setExtendedProp("completed", completeBoxChecked)
        if (event.extendedProps.completed === true) {
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

    if (renderCount > 0) {
        return (
            <>
                <Modal
                    title="Modify or Delete"
                    open={isModalOpen}
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
                        <Checkbox checked={newRangeDisabled} onChange={(e) => {
                            setNewRangeDisabled(e.target.checked)
                        }}>Modify Time</Checkbox>
                        <RangePicker {...rangeConfig} showTime format="YYYY-MM-DD HH:mm:ss" disabled={!newRangeDisabled}
                                     onChange={(value) => {
                                         setModifiedEventTime(value);
                                     }}/>
                    </Row>

                    <Row>
                        <Checkbox checked={newTitleDisabled} onChange={(e) => {
                            setNewTitleDisabled(e.target.checked)
                        }}>Modify Title</Checkbox>
                        <Input
                            showCount
                            maxLength={20}
                            defaultValue=""
                            onChange={(e) => {
                                setModifiedEventTitle(e.target.value)
                            }}
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
                            start: event.startTime,
                            end: event.endTime,
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
    }
};

export default Calendar;
