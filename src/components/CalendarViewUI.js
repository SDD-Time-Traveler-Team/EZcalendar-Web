import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
//import listPlugin from '@fullcalendar/list';

class CalendarViewUI extends React.Component {


    render() {
        return(
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin,interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar = {{
                    center: 'New dayGridMonth,timeGridWeek,timeGridDay',
                }}
                customButtons= {{
                    New:{
                        text: 'New(Event/Task)',
                        click: function(){
                            alert("Click New");
                        },
                    }
                    
                }}
            />
        )
    }
}

export default CalendarViewUI;
