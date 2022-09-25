import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

class MonthlyViewUI extends React.Component {
    render() {
        return(
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
            />
        )
    }
}

export default MonthlyViewUI;
