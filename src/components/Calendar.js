import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import listPlugin from '@fullcalendar/list';

const Calendar = ({ events, setEvents, tasks, setTasks }) => {
    const onEventChange = ({ event, oldEvent, revert }) => {
        //TODO: change in db
        if (oldEvent.extendedProps.hasOwnProperty("completed")) {
            // task
            setTasks((prev) => {
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
                });
            });
        } else {
            // event
            setEvents((prev) => {
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
                });
            });
        }
    };

    const onEventRemove = ({ event, revert }) => {
        //TODO: remove in db
        if (event.extendedProps.hasOwnProperty("completed")) {
            // task
            setTasks((prev) => {
                prev.filter((task) => "task" + task.id !== event.id);
            });
        } else {
            // event
            setEvents((prev) => {
                prev.filter((item) => "event" + item.id !== event.id);
            });
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
                center: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            editable
            events={events.concat(tasks).map((event) => {
                const newEvent = {
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    extendedProps: {
                        tagId: event.tagId,
                    },
                };

                if (event.hasOwnProperty("completed")) {
                    // task
                    newEvent.id = `task${event.id}`;
                    newEvent.extendedProps.completed = event.completed;
                    newEvent.backgroundColor = "blue";
                } else {
                    // event
                    newEvent.id = `event${event.id}`;
                    newEvent.backgroundColor = "yellow";
                }

                return newEvent;
            })}
            eventChange={onEventChange}
            eventRemove={onEventRemove}
        />
    );
};

export default Calendar;
