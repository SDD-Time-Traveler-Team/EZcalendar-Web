import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
//import listPlugin from '@fullcalendar/list';

class CalendarViewUI extends React.Component {


    render() {
        return(
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar = {{
                    front: 'new',
                    center: 'dayGridMonth,timeGridWeek',
                }}
            />
        )
    }
}

export default CalendarViewUI;
