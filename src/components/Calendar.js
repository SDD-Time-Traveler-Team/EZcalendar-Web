import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import listPlugin from '@fullcalendar/list';

const Calendar = ({ events, setEvents, tasks, setTasks }) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
                center: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            editable
            events={events.concat(tasks)}
            eventChange={(changeInfo) => {
                console.log(changeInfo["event"]);
            }}
        />
    );
};

export default Calendar;
