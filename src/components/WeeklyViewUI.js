import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';

class WeeklyViewUI extends React.Component {
    render() {
        return(
            <FullCalendar
                plugins={[ timeGridPlugin ]}
                initialView="timeGridWeek"
            />
        )
    }
}

export default WeeklyViewUI;
